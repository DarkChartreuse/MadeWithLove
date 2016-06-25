const db = require('./db.js');
const User = require('./models/usersModel.js');
const Meal = require('./models/mealsModel.js');
const usersSeed = require('./seedData/usersSeed.js');
const mealsSeed = require('./seedData/mealsSeed.js');

db.sync({ force: true })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    User.bulkCreate(usersSeed)
    .then(() => {
      Meal.bulkCreate(mealsSeed)
      .then(() => {
        console.log('Seeding almost complete...');
      });
    });
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });
