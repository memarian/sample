const jwt = require('jsonwebtoken');

function generateToken(data) {
  return jwt.sign(data, process.env.KEY_A, {});
}

function generateRefreshToken(data) {
  return jwt.sign(data, process.env.KEY_S);
}

function verifyToken(header, type = 'r') {
  const token = getToken(header);
  if (type === 'r') return jwt.verify(token, process.env.KEY_A);
  else if (type === 't') return jwt.verify(token, process.env.KEY_S);
  return 0;
}

function getToken(header) {
  const token = header.authorization && header.authorization.split(' ')[1];

  if (!token) {
    throw new Error('access denied. no token provided.');
  }
  return token;
}

function setHeaderToken(res, token) {
  res.set('x-auth-token', token);
}

module.exports = {
  generateRefreshToken,
  generateToken,
  verifyToken,
  setHeaderToken,
};
