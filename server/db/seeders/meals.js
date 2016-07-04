'use strict';

var models = require('../models/index.js');
var mealsSeed = require('../seedData/mealsSeed.js');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
     Add altering commands here.
     Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.createTable(models.meals.tableName, models.meals.attributes)
    .then(() => queryInterface.bulkInsert('meals', mealsSeed, {}));
  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.
     */
    return queryInterface.bulkDelete('meals', null, {});
  }
};
