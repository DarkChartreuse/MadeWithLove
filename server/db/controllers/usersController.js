var db = require('../db.js');

module.exports = {
  addUser: function(req, res) {
    
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
