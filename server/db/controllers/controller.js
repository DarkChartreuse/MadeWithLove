const usersController = require('../controllers/usersController.js');
const mealsController = require('../controllers/mealsController.js');


module.exports = {
  getMealView: function(req, res) {
    var donuts = 'donuts';
    res.json(donuts);
  }
};
