const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require('../controllers/userController')

router.post('/auth/google',
	passport.authenticate('google-token', {session: false}),
	userController.googleAuth,
	userController.generateToken,
	userController.sendToken);
router.get('/signOut', userController.signOut);

module.exports = router;
