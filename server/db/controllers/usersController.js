var User = require('../models/usersModel.js');
var bcrypt = require('bcrypt');

module.exports = {
  createUser: function(req, res) {
    var salt = bcrypt.genSaltSync(10)
    var hashedPassword = bcrypt.hashSync(req.body.password, salt)
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      address: `${req.body.street}, ${req.body.city}, ${req.body.state}`,
      zip: req.body.zipcode,
      chef: req.body.chef,
    })
    .then(function(user, created) {
      console.log(user.get({
        plain: true
      }));
      console.log(created);
      res.status(200).end();
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  deleteUser: function(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(function(userToDelete) {
      console.log('Deleting user: ', userToDelete.dataValues);
      userToDelete.destroy();
    })
    .catch(function(err) {
      console.error('Error deleting user');
    })
    .finally(function() {
      res.end();
    });
  },

  getUser: function(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(function(user) {
      res.json(user.dataValues);
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  getAllUsers: function(req, res) {
    User.findAll()
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      console.error(err);
    });
  },
};
