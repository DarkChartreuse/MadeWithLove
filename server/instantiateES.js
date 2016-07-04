var elasticsearch = require('elasticsearch');

var ESDB_HOST;

ESDB_HOST = process.env.NODE_ENV === 'production' ? 'elasticdb' : 'localhost';

console.log('>>>>>>>>>>>>> elasticsearch: ', ESDB_HOST);

module.exports = new elasticsearch.Client({
  host: ESDB_HOST + ':9200',
  log: 'info'
});
