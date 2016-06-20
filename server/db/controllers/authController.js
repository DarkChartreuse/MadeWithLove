var passport = require('passport');

module.exports = {
  attemptSignIn: (req, res, user) => {
    req.login(user, err => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.json(user);
      }
    });
  },

  signIn: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        res.status(401).send(info);
      } else {
        attemptSignIn(req, res, user);
      }
    })(req, res, next);
  },

  verify: (req, res) => {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(401).json({ message: 'not logged in' });
    }
  },

  checkAuthorized: (req, res) => {
    if (req.user) {
      res.status(200).json({ loggedIn: true });
    } else {
      res.status(401).json({ loggedIn: false });
    }
  },

  checkAuthServer: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'not logged in' });
    }
  },

  signOut: (req, res) => {
    req.logout();
    res.redirect('/');
  },

};
