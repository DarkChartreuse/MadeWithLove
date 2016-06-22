const usersController = require('../controllers/usersController.js');
const ordersController = require('../controllers/ordersController.js');


module.exports = {
  getMealView: function(req, res) {
    ordersController.getOrder(req, res)
    .then( (orderResult) => {
      console.log(orderResult);
    });
  }
};