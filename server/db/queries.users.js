const User = require("./models").User;

module.exports = {
  getUser(googleId, callback) {
    User.findOne({where: {googleId} })
    .then( user => {
      callback(null, user);
    })
    .catch( err => {
      callback(err);
    })
  }
}