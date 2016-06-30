const Order = require('../models/ordersModel.js');
const User = require('../models/usersModel.js');
const elasticsearch = require('../../elasticSearch.js');

module.exports = {
  createOrder: (req, res) => {
    console.log('Hitting createOrder for in controller>>>>>', req.body);

    // elasticsearch.addOrder(req.body);

    // User.findOne({ where: { email: req.body.email } })
    // .then(result => {
      Order.create({
        chefId: req.body.chefId,
        mealId: req.body.mealId,
        userId: req.body.userId,
        food: req.body.food,
        image: req.body.image,
        price: req.body.price,
        
      // });
    })
    .catch(err => { console.error('Error adding order: ', err); })
    .finally(() => {
      console.log('Chef has now added an order: ', req.body);
      res.end();
    });
  },

  deleteOrder: (req, res) => {
    Order.findOne({ where: { id: req.params.id } })
    .then((orderToDelete) => {
      console.log('Deleting order: ', orderToDelete.dataValues);
      orderToDelete.destroy();
    })
    .catch(err => { console.error('Error deleting order', err); })
    .finally(() => {
      console.log('Chef has deleted the order: ', req.body.food);
      res.end();
    });
  },

  getOrder: (req, res) => {
    Order.findOne({ where: { id: req.params.id } })
    .then(order => {
      res.json(order.dataValues);
    })
    .catch(err => { console.error('Error fetching order', err); });
  },

  getAllOrders: (req, res) => {
    console.log('Im getting pinged!');
    Order.findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => { console.error('Error fetching orders', err); });
  },
};
