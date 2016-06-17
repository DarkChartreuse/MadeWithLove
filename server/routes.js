var User = require('./db/controllers/usersController.js');
var Order = require('./db/controllers/ordersController.js');

module.exports = function(app, express) {
  app.post('/users', User.addUser);
  app.get('/users', User.getUsers);
  app.post('/orders', Order.addOrder);
  app.get('/orders', Order.getOrders);
};
