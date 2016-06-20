const Order = require('../models/ordersModel.js');
const User = require('../models/usersModel.js');

module.exports = {
  createOrder: function(req, res) {
    User.findOne({
      where: {
        email: req.query.email,
      }
    })
    .then(function(result) {
      Order.create({
        chefId: result.id,
        food: req.query.food,
        quantity: req.query.quantity,
        price: req.query.price,
        address: req.query.address,
      });
    })
    .catch(function(err) {
      console.error('Error adding order: ', err);
    })
    .finally(function() {
      console.log('Chef has now added an order: ', req.query.food);
      res.end();
    });
  },

  deleteOrder: function(req, res) {
    Order.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(function(orderToDelete) {
      console.log('Deleting order: ', orderToDelete.dataValues);
      orderToDelete.destroy();
    })
    .catch(function(err) {
      console.error('Error deleting order');
    })
    .finally(function() {
      res.end();
    });
  },

  getOrder: function(req, res) {
    Order.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(function(order) {
      res.json(order.dataValues);
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  getAllOrders: function(req, res) {
    Order.findAll()
    .then(function(orders) {
      res.json(orders);
    })
    .catch(function(err) {
      console.error(err);
    });
  }
};
