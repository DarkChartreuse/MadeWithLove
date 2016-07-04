'use strict';

var models = require('../models/index.js');
var ordersSeed = require('../seedData/ordersSeed.js');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
     Add altering commands here.
     Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.createTable(models.orders.tableName, models.orders.attributes)
    .then(() => queryInterface.bulkInsert('orders', ordersSeed, {}));
  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.
     */
    return queryInterface.bulkDelete('orders', null, {});
  }
};
