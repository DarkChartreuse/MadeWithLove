'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    zip: DataTypes.STRING,
    profile: DataTypes.STRING,
    chef: DataTypes.BOOLEAN,
    numOrders: DataTypes.INTEGER,
    avgRating: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // users.hasMany(models.orders);
        // users.hasMany(models.meals);
      },
    },
    hooks: {
      beforeBulkCreate: function (users, options, fn) {
        users.createdAt = new Date();
        users.updatedAt = new Date();
        fn(null, users);
      },
      beforeUpdate: function (users, options, fn) {
        users.updatedAt = new Date();
        fn(null, users);
      },
    },
  });
  return users;
};
