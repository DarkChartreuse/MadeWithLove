var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/models/usersModel');

module.exports = function(passport) {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    console.log('the email', email)
    console.log('the password', password);
      User.findOne({ where: {
        email: email,
      }
    })
    .then(
      function(user) {
        console.log('what is the user', user);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('zzzz', user);
        return done(null, user);
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }
      
      done(null, user)
    })
  });
}
