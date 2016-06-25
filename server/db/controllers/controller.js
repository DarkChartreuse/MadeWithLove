const usersController = require('../controllers/usersController.js');
const mealsController = require('../controllers/mealsController.js');


module.exports = {
  getMealView: function(req, res) {
    mealsController.getOrder(req, res)
    .then( (mealsResult) => {
      console.log(mealsResult);
    });
  }
};
