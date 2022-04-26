const { verifyToken } = require('../auth/token');

module.exports = (req, res, next) => {
  try {
    if ((req.user = verifyToken(req.headers, 't'))) next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
