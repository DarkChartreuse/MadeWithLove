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
        // orders.belongsTo(models.users);
      }
    },
    hooks: {
      beforeBulkCreate: function (orders, options, fn) {
        orders.createdAt = new Date();
        orders.updatedAt = new Date();
        fn(null, orders);
      },
      beforeUpdate: function (orders, options, fn) {
        orders.updatedAt = new Date();
        fn(null, orders);
      }
    }
  });
  return orders;
};
