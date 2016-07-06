'use strict';

var models = require('../models/index.js');
var usersSeed = require('../seedData/usersSeed.js');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
     Add altering commands here.
     Return a promise to correctly handle asynchronicity.
     */
    return queryInterface.createTable(models.users.tableName, models.users.attributes)
    .then(() => queryInterface.bulkInsert('users', usersSeed, {}));
  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
