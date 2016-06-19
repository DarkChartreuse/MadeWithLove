var User = require('../models/usersModel.js');

module.exports = {
  addUser: function(req, res) {
    User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        zip: req.body.zip,
        chef: req.body.chef,
      }) //, defaults: {job: 'Technical Lead JavaScript'}})
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

  },
  getUsers: function(req, res) {
    User.findAll()
      .then(function(users) {
        res.json(users);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};


/*
module.exports = {
  addUser: function(req, res) {
    var queryString = `
      INSERT INTO users(
        first_name,
        last_name,
        email,
        phone,
        password,
        address,
        zip,
        chef
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    var queryValues = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.password,
      req.body.address,
      req.body.zip,
      req.body.chef
    ];
    db.query(queryString, queryValues)
      .then(function(user) {
        console.log('Added user successfully: ', user);
        res.status(200).end();
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  deleteUser: function(req, res) {

  },
  getUsers: function(req, res) {
    db.query('SELECT * FROM users')
      .then(function(results) {
        res.json(results);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};
*/
