const sequelize = require('../models/index.js');
const elasticClient = require('../../instantiateES.js');

module.exports.getRec = function(req, res) {
    var userId = req.body.userId;
    console.log('HERE IS THE USER ID >>>>>', userId);

    // fetchUserOrderHistory(userId)
    // var cuisines = {};
    sequelize.query('SELECT * FROM orders WHERE id_user =' + userId)
    .then((userOrders) => orderCountMapping(userOrders[0]))
    .then((cuisineCountByCuisineType) => findMaxOccurance(cuisineCountByCuisineType))
    .then((mostBoughtCuisine) => {
      console.log('<<><>>>>>>>>>', mostBoughtCuisine)
      elasticClient.search({
        index: 'mwl',
        type: 'meal',
        size: 5,
        body: {
          query: {
            bool: {
              must: [
                {match: {cuisine: mostBoughtCuisine}}
              ],//must
              filter: [
                {range: {rating: {"gte": 4}}}
              ]//filter
            }//bool
          }//query
        }//body
      }).catch(err => console.log)
    .then((results) => {
      var results = results.hits.hits;
      console.log('I AM HERE IN RESULTS >>>>>>>' , results);
      res.send(results);
    })
    .catch(err => console.log("Elastic search errored out: ", err));
    })
    .finally(() => console.log('Function complete'))
}

// function fetchUserOrderHistory(userId) {
//   .then(function(orders) {
//     console.log(orders);
//     // next(orders);
//   })
//   .catch(err => { console.error('Error finding orders', err); })
// }


function orderCountMapping(ordersArray) {
  var cuisineCount = {};
  // console.log('>>>>>>>>>>>>>>>>>>> ORDERS', JSON.stringify(ordersArray));
  for(var i = 0; i < ordersArray.length; i++) {
    var currCuisine = ordersArray[i].cuisine;

    if(cuisineCount[currCuisine]) { cuisineCount[currCuisine]++; }
    else { cuisineCount[currCuisine] = 1; }
  }

  // console.log(JSON.stringify(cuisineCount));
  return cuisineCount;
}


function findMaxOccurance(cuisinesByOrderCount) {
  // console.log(cuisinesByOrderCount);
  var maxCount      = 0;
  var maxCuisine    = "";

  for(var props in cuisinesByOrderCount) {
    var currCount = cuisinesByOrderCount[props];
    if( currCount > maxCount) {
      maxCount = currCount;
      console.log(props);
      maxCuisine = props;
    }
  }
  console.log('Max Cuisine:',  maxCuisine);
  return maxCuisine;
}


// function mealsToRecommendByCuisine(cuisine) {

// }
