// const cors = require('cors');
const customers = require('../components/customer');
const auths = require('../components/auth');
const types = require('../components/type');
const messages = require('../components/message');
const docs = require('./doc');
const apiUri = process.env.API_URI;

module.exports = function (app) {
  app.use(cors);

  app.use(`${apiUri}/auths`, auths);
  app.use(`${apiUri}/types`, types);
  app.use(`${apiUri}/messages`, messages);
  app.get('/favicon.ico', (req, res) => {
    return res.status(204).end();
  });
};
