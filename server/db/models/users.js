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
    avgRating: DataTypes.FLOAT,
    stripe: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};