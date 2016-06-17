// create Postgres instance with pg-promise
var pgp = require('pg-promise')();

var connection = {
  host: 'localhost',
  port: 5432,
  database: 'mwl_db',
  user: 'postgres'
};
// create Postgres database object
var db = pgp(connection);

module.exports = db;

/**
// var queryStrOrders = `
//   CREATE TABLE orders (
//     id_chef   varchar(25),
//     id_user   varchar(25),
//     rating    int(1)
//   );
// `;
/**** query examples:

// SELECT:
db.any("select * from users where active=$1", [true])
  .then(function (data) {
    // success;
  })
  .catch(function (error) {
    // error;
  });

// INSERT:
db.none("insert into users(name, active) values($1, $2)", ['John', true])
  .then(function () {
    // success;
  })
  .catch(function (error) {
    // error;
  });

// INSERT with result:
db.one("insert into users(name, active) values($1, $2) returning id", ['John', true])
  .then(function (data) {
    console.log(data.id); // print new user id;
  })
  .catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  });

//

****/
