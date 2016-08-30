var elasticsearch = require('elasticsearch');

// var ESDB_HOST = process.env.NODE_ENV === 'production' ? 'elasticdb' : 'localhost';
// console.log('>>>>>>>>>>>>> elasticsearch: ', ESDB_HOST);

module.exports = new elasticsearch.Client({
  protocol: 'https',
  host: 'search-elasticmwl-xterfj3nmjftzwol6co6uwucoi.us-east-1.es.amazonaws.com',
  path: '/mwl/meal/',
  log: 'info'
});
