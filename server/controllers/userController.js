const userQueries = require("../db/queries.users.js");
const jwt = require('jsonwebtoken');

const createToken = function (auth) {
	return jwt.sign({
		id: auth.id
	}, process.env.JWT_SECRET || 'my-secret',
		{
			expiresIn: "12h"
		});
};

module.exports = {
	signOut(req, res, next) {
    req.logOut();
    res.redirect("/");
	},
	getUser(req, res, next) {
		if (req.user) {
			userQueries.getUser(req.user.id, (err, user) => {
				if (user) {
					res.send(user)
				} else {
					return res.status(err.status).end();
				}
			})
		} else {
			res.status(400).end();
		}
	},
	googleAuth: (req, res, next) => {
		if (!req.user) {
				return res.status(401);
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
		return res.status(200).json(req.user);
	},
	verifyToken: (req, res, next) => {
		const token = req.headers['x-auth-token'];
		jwt.verify(token,
			process.env.JWT_SECRET || 'my-secret',
			(err, decoded) => {
				if (decoded) {
					userQueries.getUser(decoded.id, (err, user) => {
						if (user) {
							req.user = user;
							next();
						} else {
							req.user = null;
							next();
						}
					})
				} else {
					req.user = null;
					next();
				}
			});
	
	}
}