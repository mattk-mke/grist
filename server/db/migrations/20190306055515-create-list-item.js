'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isPurchased: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      priority: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['low', 'medium', 'high'],
        defaultValue: 'medium'
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "userId"
        }
      },
      listId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Lists",
          key: "id",
          as: "listId"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ListItems');
  }
};