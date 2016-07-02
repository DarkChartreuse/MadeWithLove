const db = require('./db.js');
const User = require('./models/usersModel.js');
const Order = require('./models/ordersModel.js');
const usersSeed = require('./seedData/usersSeed.js');
const ordersSeed = require('./seedData/ordersSeed.js');

db.sync({ force: true })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    User.bulkCreate(usersSeed)
    .then(() => {
      Order.bulkCreate(ordersSeed)
      .then(() => {
        console.log('Completing database seeding...');
      });
    });
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });
