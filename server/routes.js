var User = require('./db/controllers/usersController.js');
var Order = require('./db/controllers/ordersController.js');
var Controller = require('./db/controllers/controller.js');
var passport = require('passport');

module.exports = function(app, express) {

  const attemptSignIn = (req, res, user) => {
    req.login(user, err => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.json(user);
      }
    });
  };

  const signIn = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        res.status(401).send(info);
      } else {
        attemptSignIn(req, res, user);
      }
    })(req, res, next);
  };


  app.post('/api/users', User.createUser);
  app.get('/api/users', User.getAllUsers);
  app.get('/api/users/:id', User.getUser);
  app.delete('/api/users/:id', User.deleteUser);

  app.post('/api/orders', Order.createOrder);
  app.get('/api/orders', Order.getAllOrders);
  app.get('/api/orders/:id', Order.getOrder);
  app.delete('/api/orders/:id', Order.deleteOrder);

  app.get('/api/meal/:id', Controller.getMealView);

  app.post('/api/auth/sign-in', signIn);

  //   passport.authenticate('local'), (req, res)=>{
  //   if (err || !req.user) {
  //     res.status(401).send(err);
  //   } 
  //   res.json(req.user);
  // });
  app.get('/logout', function(req, res) {
      req.logout()
      res.redirect('/')
    })
  // app.get('/api/auth/sign-out', Auth.signOut);
  // app.get('/api/auth/verify', Auth.verify);
  // app.get('/api/auth/check-authorized', Auth.checkAuthorized);
  var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/signin');
  }
};
