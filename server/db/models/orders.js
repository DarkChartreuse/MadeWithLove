'use strict';
module.exports = function(sequelize, DataTypes) {
  var orders = sequelize.define('orders', {
    user_id: DataTypes.INTEGER,
    chef_id: DataTypes.INTEGER,
    meal_id: DataTypes.STRING,
    food: DataTypes.STRING,
    cuisine: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    user_address: DataTypes.STRING,
    order_date: DataTypes.DATE,
    rating: DataTypes.FLOAT,
    review: DataTypes.STRING,
    image: DataTypes.STRING,
    delivered: DataTypes.BOOLEAN,
    paid: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return orders;
};