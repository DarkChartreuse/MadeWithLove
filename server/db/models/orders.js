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
    order_date: DataTypes.DATE,
    rating: DataTypes.FLOAT,
    review: DataTypes.STRING,
    image: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_address: DataTypes.STRING,
    user_phone: DataTypes.STRING,
    user_email: DataTypes.STRING,
    chef_name: DataTypes.STRING,
    chef_address: DataTypes.STRING,
    chef_phone: DataTypes.STRING,
    chef_email: DataTypes.STRING,
    meal_added_date: DataTypes.DATE,
    delivered: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return orders;
};