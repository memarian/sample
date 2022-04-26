const auth = require('../middleware/auth');
const router = require('express').Router();
const controller = require('./controller');

router
  .route('/')
  .get(auth, controller.getCustomer)
  .post(auth, controller.addInfo)
  .put(auth, controller.editInfo);

module.exports = router;
