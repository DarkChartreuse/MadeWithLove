'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      chef_id: {
        type: Sequelize.INTEGER
      },
      meal_id: {
        type: Sequelize.STRING
      },
      food: {
        type: Sequelize.STRING
      },
      cuisine: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      user_address: {
        type: Sequelize.STRING
      },
      order_date: {
        type: Sequelize.DATE
      },
      rating: {
        type: Sequelize.FLOAT
      },
      review: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      delivered: {
        type: Sequelize.BOOLEAN
      },
      paid: {
        type: Sequelize.BOOLEAN
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('orders');
  }
};