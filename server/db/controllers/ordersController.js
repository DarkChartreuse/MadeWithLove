var db = require('../db.js');

module.exports = {
  addOrder: function(req, res) {
    var queryString = `INSERT INTO orders(
      id_user,
      id_chef,
      email,
      phone,
      password,
      address,
      chef,
      num_orders,
      avg_rating)
      values($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    var queryValues = [
      req.body.id_user,
      req.body.id_chef,
      req.body.email,
      req.body.phone,
      req.body.password,
      req.body.address,
      req.body.chef,
      req.body.num_orders,
      req.body.avg_rating
    ];
    db.query(queryString, queryValues)
      .then(function(results) {
        res.status(200).end();
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  deleteOrder: function(req, res) {

  },
  getOrders: function(req, res) {
    db.query('SELECT * FROM users')
      .then(function(results) {
        res.json(results);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};


/***

var queryResult = {
one: 1,   // Single row is expected.
many: 2,  // One or more rows expected.
none: 4,  // Expecting no rows.
any: 6    // many|none - any result is expected.
};

// this:
db.query('select * from users');
// is equivalent to making one of the following calls:
var qrm = pgp.queryResult;
db.query('select * from users', undefined, qrm.many | qrm.none);
db.query('select * from users', undefined, qrm.any);
db.manyOrNone('select * from users');
db.any('select * from users');

// other query patterns:
db.many(query, values);       // expects one or more rows
db.one(query, values);        // expects a single row
db.none(query, values);       // expects no rows
db.any(query, values);        // expects anything, same as `manyOrNone`
db.oneOrNone(query, values);  // expects 1 or 0 rows
db.manyOrNone(query, values); // expects anything, same as `any`

**/
