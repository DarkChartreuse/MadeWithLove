var elasticsearch = require('elasticsearch');
var generateEmail = require('./emailGenerator.js');



var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

var indexName = 'mwl';

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
        image: {"type": 'string', "index": "not_analyzed"},
        date: {"type": "date", "format": "yyyy-MM-dd"},
        time: {"type": "basic_time_no_millis", "format": "HHmmssZ"}, 
        food: {type: 'string', "index": "analyzed", "analyzer": "english"},
        cuisine:  {type: 'string', "index": "analyzed", "analyzer": "english"},
        healthLabels: {type: 'string', "index": "analyzed", "analyzer": "english"},
        isChef: {type: 'boolean'},
        chefId: {type: 'integer'},
        chefEmail:{type: 'string'},
        chefAddress:{type: 'string'},
        chefPhone:{type: 'string'},
        chef: {type: 'string', "index": "not_analyzed", "analyzer": "english"},
        ingredients:  {type: 'string', "index": "analyzed", "analyzer": "english"},
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
  
  let to = meal.chefEmail;
  let chefName = meal.chefName;
  let mealName = meal.typeoffood; 
  let date = 'Placeholder DATE: 12.31.16';
  let subject = 'Your meal has been created';
  let text = 'Your meal:' + mealName + ' has been created.';
  let htmlBody = generateEmail.mealCreatedEmailBody(chefName, mealName, date);

  console.log('<<<<<<<<<<<<<<<<Generating EMAIL>>>>>>>>>>>>');
  generateEmail.sendEmail(to, subject, text, htmlBody);



  return elasticClient.index({
    index: indexName,
    type: 'meal',
    body: {
      image: meal.image,
      date: meal.add_date,
      time: meal.add_time,
      food: meal.typeoffood,
      cuisine: meal.cuisinetype,
      chefId: meal.chefID,
      chef: meal.chefName,
      chefEmail: meal.chefEmail,
      chefAddress: meal.chefAddress,
      chefPhone: meal.chefPhone,
      isChef: meal.isChef,
      ingredients: meal.ingredients,
      description: meal.description,
      healthLabels: meal.healthLabels,
      quantity: meal.quantity,
      rating: meal.rating,
      price: meal.price,
      loc: meal.loc,
      zipcode: meal.zipcode,
    },
  });
};

