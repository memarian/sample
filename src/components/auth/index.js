const router = require('express').Router();
const { userAuth, verify } = require('./controller');
const { renewToken } = require('./renew');

router.post('/token', renewToken);
router.put('/verify', verify);
router.post('/:users', userAuth);

module.exports = router;
