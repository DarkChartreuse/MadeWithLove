var Sequelize = require('sequelize');

var User = Sequelize.define('users',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING(25),
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.STRING(25),
      field: 'last_name',
    },
    email: {
      type: Sequelize.STRING(50),
      field: 'email',
    },
    phone: {
      type: Sequelize.STRING(15),
      field: 'phone',
    },
    password: {
      type: Sequelize.STRING,
      field: 'password',
    },
    address: {
      type: Sequelize.STRING(50),
      field: 'address',
    },
    zip: {
      type: Sequelize.STRING(5),
      field: 'zip',
    },
    chef: {
      type: Sequelize.BOOLEAN,
      field: 'chef',
    },
    numOrders: {
      type: Sequelize.INTEGER,
      field: 'num_orders',
    },
    avgRating: {
      type: Sequelize.FLOAT,
      field: 'avg_rating',
    },
  },
  { freezeTableName: true } // Model tableName will be the same as the model name)
);

module.exports = User;
// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });
