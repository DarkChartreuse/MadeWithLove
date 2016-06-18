var db = require('../db.js');

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
        chef,
        num_orders,
        avg_rating
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    var queryValues = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone,
      req.body.password,
      req.body.address,
      req.body.zip,
      req.body.chef,
      req.body.num_orders,
      req.body.avg_rating
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
