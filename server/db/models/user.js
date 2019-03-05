'use strict';

// const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    googleId: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Google ID already exists."
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    picture: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  // User.prototype.checkToken = function (inputToken) {
  //   return bcrypt.compareSync(inputToken, this.token);
  // }
  // User.hashToken = function (plainTextToken) {
  //   return bcrypt.hashSync(plainTextToken, 10);
  // };

  // User.beforeCreate( (user, options) => {
  //   const hashedToken = User.hashToken(user.token)
  //   user.token = hashedToken;
  //   return user;
  // });

  return User;
};