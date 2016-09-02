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
    access_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    stripe_publishable_key: DataTypes.STRING,
    stripe_user_id: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    underscored: true
  });
  return users;
};
