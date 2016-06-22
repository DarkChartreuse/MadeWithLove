const Order = require('../models/ordersModel.js');
const User = require('../models/usersModel.js');

module.exports = {
  createOrder: (req, res) => {
    User.findOne({ where: { email: req.query.email } })
    .then(result => {
      Order.create({
        chefId: result.id,
        food: req.query.food,
        cuisine: req.query.cuisine,
        description: req.query.cuisine,
        quantity: req.query.quantity,
        price: req.query.price,
        address: req.query.address,
      });
    })
    .catch(err => { console.error('Error adding order: ', err); })
    .finally(() => {
      console.log('Chef has now added an order: ', req.query.food);
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
      console.log('Chef has deleted the order: ', req.query.food);
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
    Order.findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => { console.error('Error fetching orders', err); });
  },
};
