// const logger = require('../../bootstrap/logging');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`not found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    return res.status(400).json({ message: err });
  }

  if (err.code === 11000) {
    res.status(400);
  }

  if (err.name === 'UnauthorizedError') {
    res.status(401);
    err.message = 'Invalid Token';
  }

  if (res.statusCode < 400) res.status(500);
  if (process.env.NODE_ENV === 'production') {
    res.json({
      message: err.message,
    });
  } else {
    res.json({
      message: `🛑 ${err.name} : ${err.message}`,
      stack: err.stack,
    });
  }
}

module.exports = {
  notFound,
  errorHandler,
};
