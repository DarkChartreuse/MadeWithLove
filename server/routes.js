var User = require('./db/controllers/usersController.js');
var Order = require('./db/controllers/ordersController.js');

module.exports = function(app, express) {
  app.post('/api/users', User.createUser);
  app.get('/api/users', User.getAllUsers);
  app.get('/api/users/:id', User.getUser);
  app.delete('/api/users/:id', User.deleteUser);

  app.post('/api/orders', Order.createOrder);
  app.get('/api/orders', Order.getAllOrders);
  app.get('/api/orders/:id', Order.getOrder);
  app.delete('/api/orders/:id', Order.deleteOrder);
};
