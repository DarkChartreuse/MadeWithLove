const User = require('../models/index.js').users;
const bcrypt = require('bcrypt');

module.exports = {
  createUser: (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(exists => {
      if (exists) {
        return res
          .status(400)
          .type('json')
          .json({ message: 'User with same email already exists' });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      return User.create({
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        description: req.body.description,
        phone: req.body.phone,
        password: hashedPassword,
        address: `${req.body.street}, ${req.body.city}, ${req.body.state}`,
        zip: req.body.zipcode,
        profile: '', // TODO: point to uploaded image link
        chef: req.body.chef,
      })
      .then(user => {
        res.json(user);
      })
      .catch(err => { console.error(err); });
      });
  },

  updateSearchHistory: (req, res) => {
    console.log('im passing this data as the req body userID: >>>', req.body.userID);

    User.findOne({ where: { id: req.body.userID } })
    .then( user => {
      if(user) {
        console.log("THIS IS THE USER>>>>>>>>>>", user);
        user.updateAttributes({
          searches: req.body.searchQuery
        })
        .then( updatedUser => {
          res.json(updatedUser);
          console.log('user search history updated!');
        })
        .catch(err => { console.error('Error updating user search history'); });
      } else {
        console.log('this user does not exist, cannot update search history');
      }
    })
  },

  updateUser: (req, res) => {
    console.log('im passing this data as the req body userID: >>>', req.body.userID);
    User.findOne({ where: { id: req.body.userID } })
    .then( user => {
      if(user) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        user.updateAttributes({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          description: req.body.description,
          phone: req.body.phone,
          password: hashedPassword,
          address: req.body.address,
          zip: req.body.zip,
          profile: req.body.profile
        })
        .then( updatedUser => {
          res.json(updatedUser);
          console.log('user successfully updated!');
        })
        .catch(err => { console.error('Error updating user', err); });
      } else {
        console.log('this user does not exist. cannot update');
      }
    })

  },

  deleteUser: (req, res) => {
    User.findOne({ where: { id: req.params.id } })
    .then(userToDelete => {
      console.log('Deleting user: ', userToDelete.dataValues);
      userToDelete.destroy();
    })
    .catch(err => { console.error('Error deleting user', err); })
    .finally(() => {
      res.end();
    });
  },

  getUser: (req, res) => {
    User.findOne({ where: { id: req.params.id } })
    .then(user => {
      console.log('this is the user data entirety:', user);
      res.json(user.dataValues);
    })
    .catch(err => { console.error('Error fetching user', err); });
  },

  getAllUsers: (req, res) => {
    User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => { console.error('Error fetching users', err); });
  },
};
