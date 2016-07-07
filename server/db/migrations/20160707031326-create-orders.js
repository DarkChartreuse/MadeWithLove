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
      user_name: {
        type: Sequelize.STRING
      },
      user_address: {
        type: Sequelize.STRING
      },
      user_phone: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING
      },
      chef_name: {
        type: Sequelize.STRING
      },
      chef_address: {
        type: Sequelize.STRING
      },
      chef_phone: {
        type: Sequelize.STRING
      },
      chef_email: {
        type: Sequelize.STRING
      },
      meal_added_date: {
        type: Sequelize.DATE
      },
      delivered: {
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