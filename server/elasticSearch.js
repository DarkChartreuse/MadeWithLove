var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

var indexName = 'meals';

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
    type: 'meal',
    body: {
      properties: {
        food: {type: 'string'},
        cuisine:  {type: 'string'},
        isChef: {type: 'boolean'},
        chefID: {type: 'integer'},
        chefName: {type: 'string'},
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

module.exports.addMeal = function(meal) {
  console.log('CREATING elasticsearch meal>>>>>>>>>>>>', meal);
  return elasticClient.index({
    index: indexName,
    type: 'meal',
    body: {
      date: meal.add_date,
      time: meal.add_time,
      food: meal.typeoffood,
      cuisine: meal.cuisine,
      chefID: meal.chefID,
      chefName: meal.chefName,
      isChef: meal.isChef,
      ingredients: meal.ingredients,
      description: meal.description,
      quantity: meal.quantity,
      rating: meal.rating,
      price: meal.price,
      loc: meal.loc,
      zipcode: meal.zipcode,
    },
  });
};

