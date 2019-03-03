const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../db/models").User;

module.exports = {
  init(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new GoogleStrategy({
      clientID: "632347726974-7i4huihhgbe271hql545uajf2jukag4o.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
      (token, refreshToken, profile, done) => {
        console.log('[success]', profile.emails[0].value);
        const userEmail = profile.emails[0].value;
        User.findOrCreate({ where: { googleId: profile.id },
          defaults: {name: profile.displayName, email: userEmail} })
        .then( user => {
          console.log('[created or found]');
          return done(null, user);
        })
        .catch( err => {
          console.log('[model error]', err);        
          return done(err);
        });
      }
    ));
    passport.serializeUser( (user, callback) => {
      callback(null, user);
    });
    passport.deserializeUser( (user, callback) => {
      User.findById(user.id)
      .then( user => {
        callback(null, user);
      })
      .catch( err => {
        callback(err);
      });
    });
  }
}