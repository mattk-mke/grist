'use strict';
module.exports = (sequelize, DataTypes) => {
  var ListItem = sequelize.define('ListItem', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPurchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    priority: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['low', 'medium', 'high'],
      defaultValue: 'medium'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  ListItem.associate = function(models) {
    // associations can be defined here
    ListItem.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    ListItem.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });

  };
  return ListItem;
};