const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.getTypes);
router.get('/:name', controller.getTypeByName);

module.exports = router;
