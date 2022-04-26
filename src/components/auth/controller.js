const { validateCode, validateMobile, verifyModel } = require('./model');
const customerRepository = require('../customer/repository');
const token = require('./token');

async function getUser(mobile) {
  let customer = await customerRepository.findByMobile(mobile);
  if (!customer) {
    customer = await customerRepository.createCustomer(mobile);
  }

  return customer;
}

async function customerAuth(req, res) {
  const { error } = validateMobile(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { mobile } = req.body;
  let verifyDoc = await verifyModel.findOne({ mobile });
  if (!verifyDoc) {
    verifyDoc = new verifyModel();
    verifyDoc.mobile = mobile;
  }
  verifyDoc.count++;
  verifyDoc.ip = req.ip;
  if (process.env.NODE_ENV === 'production') {
    sms.verifyLoopUp(verifyDoc.code, '', mobile);
    res.status(201).send();
  } else res.status(201).send(verifyDoc);
  verifyDoc.sent = Date.now;
  await verifyDoc.save();
}

async function verify(req, res, next) {
  const { error } = validateCode(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { mobile, code } = req.body;
  let ip = req.ip;
  const result = await verifyModel.findOne({ code, mobile, ip }).lean();

  if (!result) {
    res.status(403);
    throw new Error('invalid inputs');
  }

  const customer = await getUser(mobile);

  const obj = {
    id: customer._id,
    user: 'user',
  };

  const accessToken = token.generateToken(obj);
  const refreshToken = token.generateRefreshToken(obj);

  res.set('x-auth-token', accessToken);
  res.set('x-auth-refreshtoken', refreshToken);
  res.status(201).send({});
  await verifyModel.deleteOne({ _id: result._id });
}

async function userAuth(req, res, next) {
  const user = req.params.users;
  if (user === 'customer') return await customerAuth(req, res);
  if (user === 'driver') return await driverAuth();
  if (user === 'sv') return await superVisorAuth();

  res.status(400).json('user type not found');
}

module.exports = { userAuth, verify };
