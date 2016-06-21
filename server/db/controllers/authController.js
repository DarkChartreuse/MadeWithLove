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
        console.log('signIn page')
        res.redirect('/');
      }
    })(req, res, next);
  },
};
