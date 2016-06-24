const User = require('./db/controllers/usersController.js');
const Order = require('./db/controllers/ordersController.js');
const Controller = require('./db/controllers/controller.js');
const passport = require('passport');

module.exports = (app) => {
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

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  let isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/signin');
  };
};
