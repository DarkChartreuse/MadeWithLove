var Sequelize = require('sequelize');

var DB_HOST;
var DB_USER = 'postgres';
var DB_PW = 'postgres';

DB_HOST = process.env.NODE_ENV === 'production' ? 'postgresdb' : 'localhost';

var opts = {
  database: 'mwl_db',
  username: DB_USER,
  password: DB_PW,
};

console.log('>>>>>>>>>>>>>>>> sequelize ip: ', DB_HOST);

var sequelize = new Sequelize(opts.database, opts.username, opts.password, {
  host: DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;
