var sequelize = require('../db.js');
var Sequelize = require('sequelize');

var Order = sequelize.define('orders',
  {
    userId: {
      type: Sequelize.INTEGER,
      field: 'id_user',
    },
    chefId: {
      type: Sequelize.INTEGER,
      field: 'id_chef',
    },
    food: {
      type: Sequelize.STRING,
      field: 'food',
    },
    cuisine: {
      type: Sequelize.STRING,
      field: 'cuisine',
    },
    quantity: {
      type: Sequelize.INTEGER,
      field: 'quantity',
    },
    price: {
      type: Sequelize.FLOAT,
      field: 'price',
    },
    address: {
      type: Sequelize.STRING,
      field: 'address',
    },
    orderDate: {
      type: Sequelize.DATE,
      field: 'order_date',
    },
    rating: {
      type: Sequelize.INTEGER,
      field: 'rating',
    },
    review: {
      type: Sequelize.TEXT,
      field: 'review',
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  } // Model tableName will be the same as the model name)
);

module.exports = Order;
