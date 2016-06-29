const Meal = require('../models/mealsModel.js');
const User = require('../models/usersModel.js');
const elasticsearch = require('../../elasticSearch.js');

module.exports = {
  createMeal: (req, res) => {
    console.log('Hitting createMeal for in controller>>>>>', req.body);

    elasticsearch.addMeal(req.body);

    // User.findOne({ where: { email: req.body.email } })
    // .then(result => {
      Meal.create({
        // chefId: result.id,
        food: req.body.food,
        cuisine: req.body.cuisine,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        address: req.body.address,
      // });
    })
    .catch(err => { console.error('Error adding meal: ', err); })
    .finally(() => {
      console.log('Chef has now added an meal: ', req.body.food);
      res.end();
    });
  },

  deleteMeal: (req, res) => {
    Meal.findOne({ where: { id: req.params.id } })
    .then((mealToDelete) => {
      console.log('Deleting order: ', mealToDelete.dataValues);
      mealToDelete.destroy();
    })
    .catch(err => { console.error('Error deleting order', err); })
    .finally(() => {
      console.log('Chef has deleted the order: ', req.body.food);
      res.end();
    });
  },

  getMeal: (req, res) => {
    Meal.findOne({ where: { id: req.params.id } })
    .then(meal => {
      res.json(meal.dataValues);
    })
    .catch(err => { console.error('Error fetching meal', err); });
  },

  getAllMeals: (req, res) => {
    console.log('Im getting pinged!');
    Meal.findAll()
    .then(meals => {
      res.json(meals);
    })
    .catch(err => { console.error('Error fetching meals', err); });
  },
};
