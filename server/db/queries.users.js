const User = require("./models").User;

module.exports = {
  getUser(id, callback) {
    User.findByPk(id)
    .then( user => {
      callback(null, user);
    })
    .catch( err => {
      callback(err);
    })
  }
}