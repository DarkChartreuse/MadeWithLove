var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/models/usersModel');
var bcrypt = require('bcrypt');

module.exports = function(passport) {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
      User.findOne({ where: {
        email: email,
      }
    })
    .then(
      function(user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        } 
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, {id: user.id, name: user.firstName, email: user.email});
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log("serialize");
    done(null, user.id);
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
