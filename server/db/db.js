var Sequelize = require('sequelize');
var opts = {
  database: 'mwl_db',
  username: 'postgres',
  password: '',
};

var sequelizeAddress = process.env.MWLDB_PORT_5432_TCP_ADDR || 'localhost';
console.log('>>>>>>>>>>>>>>>> sequelize ip: ', sequelizeAddress);

var sequelize = new Sequelize(opts.database, opts.username, opts.password, {
  host: sequelizeAddress,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;
