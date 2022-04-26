const Customer = require('./model');
const httpError = require('http-errors');

async function findByMobile(mobile, ln = false) {
  return await Customer.findOne({ mobile }).lean(ln);
}

async function findCustomer(customerId, ln = false) {
  return await Customer.findById(customerId).lean(ln);
}

async function insertContent(userId, list) {
  if (list.constructor !== Array) throw Error('type invalid');
  let customer = await Customer.findById(userId, {
    contents: 1,
  });
  if (!customer) throw Error('not found');
  for (let i = 0; i < list.length; i++)
    if (customer.contents.indexOf(list[i]) === -1)
      customer.contents.push(list[i]);
  await customer.save();
}

async function findById(id, select = '', ln = true) {
  return await Customer.findById(id, `${select}`).lean(ln);
}

async function createCustomer(mobile) {
  return await Customer.create({
    mobile,
    honors: 1,
  });
}

async function findMessages(userId, ln = false) {
  return await Customer.findById(userId, { _id: 0, inbox: 1 }).lean(ln);
}

async function findPoints(userId, ln = false) {
  return await Customer.findById(userId, { _id: 0, points: 1 }).lean(ln);
}




async function editInfo(userId, data) {
  let customer = await Customer.findById(userId);
  if (!customer) {
    throw Error('customer not found');
  }
  customer.info = data;
  await customer.save();
}

async function insertInfo(userId, data) {
  let customer = await Customer.findById(userId);
  if (!customer) throw Error('customer not found');
  console.log(customer);
  if (customer.hasOwnProperty('info'))
    throw Error(
      'customer information already exist, used another endpoint to edit'
    );
  customer.info = data;
  await customer.save();
}

async function setDefault(id, locationId) {
  const customer = await Customer.findById(id);
  if (!result) throw Error('customer not found!');

  for (let index = 0; index < custoemr.locations.list.length; index++) {
    const element = custoemr.locatoins.list[index];
    if (element._id === locationId) {
      customer.locations.primary = index;
      break;
    }
  }
  await customer.save();
}

async function addLocation(id, { type, locationId }, name, isDefault = 0) {
  const customer = await Customer.findById(id);
  if (isDefault) customer.locations.unshift({ _id: locationId, type, name });
  else customer.locations.push({ _id: locationId, type, name });
  await customer.save();
}

async function getFullName(customerId) {
  // return await Customer.findById(userId).fullName;
}

async function findAll() {}



async function createFamily(customerId, data) {
  //FIXME: change to prevent erorr of null and duplicate
  const customer = await findCustomer(customerId);
  data.forEach((element) => {
    customer.family.push({
      userName: element.userName,
      firstName: element.firstName,
      lastName: element.lastName,
      assign: element.assign,
    });
  });
  await customer.save();
}

async function insertsharesLink(userId, invite) {
  const customer = await Customer.findById(userId);
  if (!customer) throw Error('user not found');

  customer.sharesLink = invite;

  await customer.save();
}

async function removeLocationId(userId, locationId) {
  const locations = await findById(userId, 'locations -_id', true);

  // implement remove from array location
}

module.exports = {
  setDefault,
  addLocation,
  findMessages,
  findAll,
  findById,
  findByMobile,
  findPoints,
  insertInfo,
  insertsharesLink,
  insertContent,
  removeLocationId,
  editInfo,
  createCustomer,
  createFamily,
};