'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      profile: {
        type: Sequelize.STRING
      },
      chef: {
        type: Sequelize.BOOLEAN
      },
      num_orders: {
        type: Sequelize.INTEGER
      },
      avg_rating: {
        type: Sequelize.FLOAT
      },
      stripe_payment_token: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      token_type: {
        type: Sequelize.STRING
      },
      stripe_publishable_key: {
        type: Sequelize.STRING
      },
      stripe_user_id: {
        type: Sequelize.STRING
      },
      scope: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('users');
  }
};