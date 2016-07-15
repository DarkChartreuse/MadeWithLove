const Meal = require('../models/index.js').meals;
const User = require('../models/index.js').users;
const elasticsearch = require('../../elasticSearch.js');
const ImageUploader = require('./imageUploader');

module.exports = {
  createMeal: (req, res) => {
    console.log('Hitting createMeal for in controller>>>>>', req.body);
    elasticsearch.addMeal(req.body);
    res.end();
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

  uploadImage: (req, res) => {

    var image = ImageUploader({
      data_uri: req.body.data_uri,
      filename: req.body.filename,
      filetype: req.body.filetype
    }).then(onGoodImageProcess, onBadImageProcess);

    function onGoodImageProcess(resp) {
      res.send({
        status: 'success',
        uri: resp
      });
    }
    function onBadImageProcess(resp) {
      res.send({
        status: 'error'
      });
    }

  },
};
