const Order = require('../models/ordersModel.js');
const User = require('../models/usersModel.js');

module.exports = {
  createOrder: (req, res) => {
    User.findOne({ where: { email: req.body.email } })
    .then(result => {
      Order.create({
        chefId: result.id,
        food: req.body.food,
        cuisine: req.body.cuisine,
        description: req.body.cuisine,
        quantity: req.body.quantity,
        price: req.body.price,
        address: req.body.address,
      });
    })
    .catch(err => { console.error('Error adding order: ', err); })
    .finally(() => {
      console.log('Chef has now added an order: ', req.body.food);
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
    Order.findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => { console.error('Error fetching orders', err); });
  },
};
