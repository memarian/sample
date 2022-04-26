const token = require('./token');


//FIXME: change user type
async function renewToken(req, res, next) {
  const decoded = token.verifyToken(req.headers, 'r');

  if (!decoded) {
    res.status(401);
    throw new Error('token invalid');
  }

  const accessToken = token.generateToken({
    id: decoded.id,
    user: 'user',
  });

  token.setHeaderToken(res, accessToken);
  res.status(201).json({});
}

module.exports = { renewToken };
