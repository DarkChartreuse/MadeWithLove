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
      console.log('the user', user);
      console.log('the info', info);
    if (err || !user) {
        console.log('am')
        res.status(401).send(info);
      } else {
        console.log('success')
        res.status(200).json(user);
      }
    })(req, res, next);
  },
};
