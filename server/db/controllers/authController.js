const passport = require('passport');
const User = require('./usersController.js');


const attemptSignIn = (req, res, user) => {
  req.login(user, err => {
    if (err) {
      res.status(401).send(err);
    } else {
      req.session.user = user;
      console.log('req session wiht user', req.session);
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

const logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
//

const globalSessionMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('is authenticated?', req.isAuthenticated());
    User.findOne({ where: { email: req.session.user.email } }, (err, user) => {
      if (user) {
        console.log('we have a user?', req.user);
        req.user = user;
        delete req.user.password;
        req.session.user = user;
      }
      next();
    });
  } else {
    next();
  }
};


const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({ message: 'you are not logged in' });
  } else {
    next();
  }
};

module.exports = {
  attemptSignIn,
  signIn,
  logOut,
  globalSessionMiddleware,
  isLoggedIn,
};
