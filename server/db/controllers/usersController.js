var User = require('../models/usersModel.js');

module.exports = {
  createUser: function(req, res) {
    User.create({
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      phone: req.query.phone,
      password: req.query.password,
      address: req.query.address,
      zip: req.query.zip,
      chef: req.query.chef,
    }) // , defaults: { chef: false }})
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
