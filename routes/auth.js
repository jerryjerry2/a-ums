const express = require('express');
const { signupGet, signupPost, signinGet, signinPost, logout} = require('../controllers/auth');

const router = express.Router();

router.get('/signup', signupGet);
router.post('/signup', signupPost);

router.get('/signin', signinGet);
router.post('/signin', signinPost);

router.get('/logout', logout);

module.exports = router;