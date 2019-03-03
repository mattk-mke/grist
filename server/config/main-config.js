require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const passportConfig = require("./passport-config");


module.exports = {
  init(app, express) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
      secret: process.env.cookieSecret || "fake cookie secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    passportConfig.init(app);
    app.use( (req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });
  }
};