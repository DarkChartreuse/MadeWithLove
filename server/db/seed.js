var db = require('./db.js');
var User = require('./models/usersModel.js');
var Order = require('./models/ordersModel.js');
var usersSeed = require('./seedData/usersSeed.js');
var ordersSeed = require('./seedData/ordersSeed.js');

db.sync({ force: true })
  .then(function() {
    User.bulkCreate(usersSeed);
  })
  .then(function() {
    Order.bulkCreate(ordersSeed);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  })
  .finally(function() {
    console.log('Seeding complete.');
  });
