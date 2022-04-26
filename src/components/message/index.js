const auth = require('../middleware/auth');
const router = require('express').Router();
const controller = require('./controller');

router.route('/').get(auth, controller.getMessages);

module.exports = router;
