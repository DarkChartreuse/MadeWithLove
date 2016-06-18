var Sequelize = require('sequelize');
var opts = {
  database: 'mwl_db',
  username: 'postgres',
  password: '',
};

var sequelize = new Sequelize(opts.database, opts.username, opts.password, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;

// // create Postgres instance with pg-promise
// var pgp = require('pg-promise')();
//
// var connection = {
//   host: 'localhost',
//   port: 5432,
//   database: 'mwl_db',
//   user: 'postgres'
// };
// // create Postgres database object
// var db = pgp(connection);
//
// module.exports = db;
