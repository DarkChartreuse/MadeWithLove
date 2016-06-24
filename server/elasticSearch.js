var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200', 
  log: 'info'
});

var indexName = 'orders'; 

module.exports.resetIndex = function () {
  indexExists.then(function (exists) {  
    if (exists) { 
      return deleteIndex(); 
    } 
  }).then(initIndex);  
}

module.exports.indexExists = function () {
  return elasticClient.indices.exists({index: indexName});
}

module.exports.initIndex = function () {
  return elasticClient.indices.create({index:indexName});
}

module.exports.deleteIndex = function () {
  return elasticClient.indices.delete({index:indexName});
}

module.exports.initMapping = function() {
  return elasticClient.indices.putMapping({
    index: indexName,
    type: 'order', 
    body: {
      properties: {
        food: {type: 'string'},
        cuisine:  {type: 'string'},
        chef: {type: 'string'},
        ingredients:  {type: 'string'},
        description: {type: 'string'},

        quantity: {type: 'integer'},
        rating: {type: 'integer'},
        price: {type: 'integer'},
        loc: {type: 'object'},
        zipcode: {type: 'integer'}        
      }
    }
  })
}

module.exports.addOrder = function(order) {
  console.log('CREATING elasticsearch order>>>>>>>>>>>>', order)
  return elasticClient.index({
    index: indexName,
    type: 'order',
    body: {
      food: order.food,
      cuisine: order.cuisine,
      chef: order.chef,
      ingredients:  order.ingredients,
      description: order.description,
      quantity: order.quantity,
      rating:order.rating,
      price:order.price,
      loc:order.loc,
      zipcode:order.zipcode            
    } 
  });
}  