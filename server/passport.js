const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/models/index').users;
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.findOne({ where: {
      email,
    },
  })
    .then(
      (user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, { id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          description: user.description,
          phone: user.phone,
          address: user.address,
          zip: user.zip,
          profile: user.profile,
          chef: user.chef,
          numOrders: user.numOrders,
          avgRating: user.avgRating,
           });
      });
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        id,
      },
    }).then((user) => {
      if (user == null) {
        done(new Error('Wrong user id.'));
      }
      done(null, user);
    });
  });
};
