const userQueries = require("../db/queries.users.js");
const jwt = require('jsonwebtoken');

const createToken = function (auth) {
	return jwt.sign({
		id: auth.id
	}, 'my-secret',
		{
			expiresIn: 60 * 120
		});
};

module.exports = {
	success(req, res, next) {
		res.redirect(`http://localhost:${process.env.PORT || '3000'}/login?token=${req.user.token}`);
	},
	signOut(req, res, next) {
    req.logOut();
    res.redirect("/");
	},
	getUser(req, res, next) {
		console.log('[req.body.token]', req.body.token);
		console.log('[req.user.token]', req.user.token);
		if (req.user && req.body.token === req.user.token) {
			userQueries.getUser(req.user.googleId, (err, user) => {
				if (user) {
					console.log('[backend user]', user);
					res.send(user)
				} else {
					res.status(err.status).end();
				}
			})
		} else {
			res.status(400).end();
		}
	},
	googleAuth: (req, res, next) => {
		if (!req.user) {
				return res.send(401, 'User Not Authenticated');
		}
		req.auth = {
				id: req.user.id
		};
		next();
	},
	generateToken: (req, res, next) => {
		req.token = createToken(req.auth);
		return next();
	},
	sendToken: (req, res) => {
		res.setHeader('x-auth-token', req.token);
		return res.status(200).send(JSON.stringify(req.user));
	}
}