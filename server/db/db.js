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
