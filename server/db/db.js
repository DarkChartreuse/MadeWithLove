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
