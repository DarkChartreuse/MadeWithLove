const sequelize = require('../db.js');
const Sequelize = require('sequelize');

const Meal = sequelize.define('meals',
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
    description: {
      type: Sequelize.STRING,
      field: 'description',
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
      type: Sequelize.FLOAT,
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

module.exports = Meal;
