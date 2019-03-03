const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require('../controllers/userController')

router.get('/login', (req, res) => res.redirect('/'));
router.get('/auth/google', 
	passport.authenticate('google', { scope: ['email profile', 'openid'] }));
router.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	userController.success);
router.get('/signOut', userController.signOut);
module.exports = router;
