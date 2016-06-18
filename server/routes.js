var User = require('./db/controllers/usersController.js');
var Order = require('./db/controllers/ordersController.js');

module.exports = function(app, express) {
  app.post('/api/users', User.addUser);
  app.get('/api/users', User.getUsers);
  app.post('/api/orders', Order.addOrder);
  app.get('/api/orders', Order.getOrders);
};
