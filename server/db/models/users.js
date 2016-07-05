'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    zip: DataTypes.STRING,
    profile: DataTypes.STRING,
    chef: DataTypes.BOOLEAN,
    num_orders: DataTypes.INTEGER,
    avg_rating: DataTypes.FLOAT,
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