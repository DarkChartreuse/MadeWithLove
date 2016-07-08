'use strict';

const db = require('../models/index.js');
const elasticClient = require('../../instantiateES.js');

module.exports.getRec = function(req, res) {
    console.log('HERE IS THE USER ID >>>>>', req.body.user_id);

    // fetchUserOrderHistory(userId)
    // var cuisines = {};
    db.sequelize.query('SELECT * FROM orders WHERE user_id = 2')
    .then((userOrders) => orderCountMapping(userOrders[0]))
    .then((cuisineCountByCuisineType) => findMaxOccurance(cuisineCountByCuisineType))
    .then((mostBoughtCuisine) => {
      console.log('<<><>>>>>>>>>', mostBoughtCuisine);
      return elasticClient.search({
        index: 'mwl',
        type: 'meal',
        size: 5,
        body: {
          query: {
            bool: {
              must: [
                {match: {cuisine: mostBoughtCuisine}}
              ],//must
              // filter: [
              //   {range: {rating: {"gte": 4}}}
              // ]//filter
            }//bool
          }//query
        }//body
      }).catch(err => console.log)
    .then((results) => {
      var resultHits = results.hits.hits;
      console.log('I AM HERE IN RESULTS >>>>>>>' , resultHits);
      res.send(resultHits);
    })
    .catch(err => console.log("Elastic search errored out: ", err));
    })
    .finally(() => console.log('Function complete'))
}


function orderCountMapping(ordersArray) {
  let cuisineCount = {};
  // console.log('>>>>>>>>>>>>>>>>>>> ORDERS', JSON.stringify(ordersArray));
  for(var i = 0; i < ordersArray.length; i++) {
    var currCuisine = ordersArray[i].cuisine;

    if(cuisineCount[currCuisine]) { cuisineCount[currCuisine]++; }
    else { cuisineCount[currCuisine] = 1; }
  }

  console.log(JSON.stringify(cuisineCount));
  return cuisineCount;
}


function findMaxOccurance(cuisinesByOrderCount) {
  console.log('cuisinesByOrderCount: ', cuisinesByOrderCount);
  let maxCount      = 0,
      maxCuisine    = "";

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
