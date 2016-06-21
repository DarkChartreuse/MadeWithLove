var User = require('./db/controllers/usersController.js');
var Order = require('./db/controllers/ordersController.js');
var Auth = require('./db/controllers/authController.js');
var passport = require('passport');

module.exports = function(app, express) {
  app.post('/api/users', User.createUser);
  app.get('/api/users', User.getAllUsers);
  app.get('/api/users/:id', User.getUser);
  app.delete('/api/users/:id', User.deleteUser);

  app.post('/api/orders', Order.createOrder);
  app.get('/api/orders', Order.getAllOrders);
  app.get('/api/orders/:id', Order.getOrder);
  app.delete('/api/orders/:id', Order.deleteOrder);

  app.post('/api/auth/sign-in', passport.authenticate('local'), (req, res)=>{
    console.log('the user is', req.user);
    res.send('/');
  });
  // app.get('/api/auth/sign-out', Auth.signOut);
  // app.get('/api/auth/verify', Auth.verify);
  // app.get('/api/auth/check-authorized', Auth.checkAuthorized);
};
