var User = require('./db/controllers/usersController.js');
var Order = require('./db/controllers/ordersController.js');
var Controller = require('./db/controllers/controller.js');
var passport = require('passport');

module.exports = function(app, express) {

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

  app.post('/api/users', User.createUser);
  app.get('/api/users', User.getAllUsers);
  app.get('/api/users/:id', User.getUser);
  app.delete('/api/users/:id', User.deleteUser);

  app.post('/api/orders', Order.createOrder);
  app.get('/api/orders', Order.getAllOrders);
  app.get('/api/orders/:id', Order.getOrder);
  app.delete('/api/orders/:id', Order.deleteOrder);

  app.get('/api/meal/:id', Controller.getMealView);

  app.post('/api/auth/sign-in', passport.authenticate('local'), (req, res)=>{
    res.send('/');
  });
  // app.get('/api/auth/sign-out', Auth.signOut);
  // app.get('/api/auth/verify', Auth.verify);
  // app.get('/api/auth/check-authorized', Auth.checkAuthorized);
  var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/signup');
  }
};
