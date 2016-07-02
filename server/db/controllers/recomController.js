const sequelize = require('../server/db/db.js');
const elasticClient = require('../server/instantiateES');

module.exports = function(req, res) {
  var userId = req.body.userId;


}

function fetchUserOrderHistory(userId) {
  var cuisines = {};
  sequelize.query('SELECT * FROM orders WHERE id_user = 1')
  .then(function(orders) {

  })
} 


function orderCountMapping(ordersArray) {
  var cuisineCount = {};
  for(var i = 0; i < ordersArray.length; i++) {
    var currCuisine = ordersArray[i];

    if(cuisineCount[currCuisine]) cuisineCount[currCuisine]++;
    else cuisineCount[currCuisine] = 1; 
  }
  return cuisineCount;
}


function findMaxOccurance(cuisinesByOrderCount) {
  var maxCount  = 0, 
      maxCuisine    = "", 

  for(var cuisine in cuisinesByOrderCount) {
    var currCount = cuisinesByOrderCount[cuisine];
    if( currCount > maxCount) {
      maxCount = currCount;
      maxCuisine = cuisine;
    }
  }
  return cuisine;
}
