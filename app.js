const express = require('express');
require('express-async-errors');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const { errorHandler, notFound } = require('./src/components/middleware/error');



app.disable('x-powered-by');
app.set('trust proxy', 'loopback');

app.use(
  // morgan(':method :url :status :res[content-length] - :response-time ms')
  morgan('dev')
);

app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// require('./src/bootstrap/redis')();
require('./src/bootstrap/db')();
require('./src/bootstrap/routes')(app);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
