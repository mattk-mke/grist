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
      callbackURL: `http://localhost:${process.env.PORT || '8080'}/auth/google/callback`
    },
      (token, refreshToken, profile, done) => {
        User.findOne({ where: { googleId: profile.id } })
        .then( foundUser => {
          const userDetails = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            token
          };
          if (!foundUser) {
            User.create(userDetails)
            .then( user => {
              console.log('[created]');
              return done(null, user);
            })
            .catch( err => {
              console.log('[model error]', err);        
              return done(err);
            });
          } else {
            User.update(userDetails, {where: {googleId: profile.id}})
            .then( user => {
              console.log('[found and updated]');
              return done(null, user);
            })
            .catch( err => {
              console.log('[model error]', err);        
              return done(err);
            });
          }
        })
        .catch( err => {
          console.log('[model error]', err);
        });
      }
    ));
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
  }
}