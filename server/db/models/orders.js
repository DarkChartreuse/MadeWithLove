'use strict';
module.exports = function(sequelize, DataTypes) {
  var orders = sequelize.define('orders', {
    userId: DataTypes.INTEGER,
    chefId: DataTypes.INTEGER,
    mealId: DataTypes.STRING,
    food: DataTypes.STRING,
    cuisine: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    userAddress: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    rating: DataTypes.FLOAT,
    review: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return orders;
};