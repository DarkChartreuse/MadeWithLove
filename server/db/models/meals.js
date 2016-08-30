'use strict';
module.exports = function(sequelize, DataTypes) {
  var meal = sequelize.define('meal', {
    userId: DataTypes.INTEGER,
    chefId: DataTypes.INTEGER,
    food: DataTypes.STRING,
    cuisine: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    address: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    rating: DataTypes.FLOAT,
    review: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // meals.belongsTo(models.users);
      }
    },
    hooks: {
      beforeBulkCreate: function (meals, options, fn) {
        meals.createdAt = new Date();
        meals.updatedAt = new Date();
        fn(null, meals);
      },
      beforeUpdate: function (meals, options, fn) {
        meals.updatedAt = new Date();
        fn(null, meals);
      }
    }
  });
  return meal;
};
