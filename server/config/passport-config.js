const passport = require("passport");
const User = require("../db/models").User;

module.exports = {
  init(app) {
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    // const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
    const GoogleStrategy = require("passport-google-token").Strategy;

    passport.serializeUser( (user, callback) => {
      callback(null, user);
    });
    passport.deserializeUser( (user, callback) => {
      User.findByPk(user.id)
      .then( user => {
        callback(null, user);
      })
      .catch( err => {
        callback(err);
      });
    });
    

    passport.use(new GoogleStrategy({
      clientID: "632347726974-7i4huihhgbe271hql545uajf2jukag4o.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET
    },
      (token, refreshToken, profile, done) => {
        User.upsert({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          picture: profile._json.picture,
          token
        }, { where: { googleId: profile.id }, returning: true })
        .then( user => {
          done(null, user[0]);
        })
        .catch( err => {
          console.log('[model error]', err);
        });
      }
    ));
    
  }
}