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
        cuisine: req.body.cuisine,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity,
        userName: req.body.userName,
        userAddress: req.body.userAddress,
        userPhone: req.body.userPhone,
        userEmail: req.body.userEmail,
        chefName: req.body.chefName,
        chefAddress: req.body.chefAddress,
        chefPhone: req.body.chefPhone,
        chefEmail: req.body.chefEmail,
        mealAddedDate: req.body.mealAddedDate,
        delivered: false,
    })
    .catch(err => { console.error('Error adding order: ', err); })
    .finally(() => {
      console.log('Chef has now added an order: ', req.body);
      res.end();
    });
  },

  updateOrder: (req, res) => {
    console.log('req params', req.params);
    Order.findOne({ where: { mealId: req.params.id } })
    .then(order => {
      console.log('we are in the order', order);
      res.json(order);
    })
    .catch(err => { console.error('Error fetching order', err); });
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
    console.log('req params', req.params);
    Order.findOne({ where: { mealId: req.params.id } })
    .then(order => {
      console.log('we are in the order', order);
      res.json(order);
    })
    .catch(err => { console.error('Error fetching order', err); });
  },

  getChefOrders: (req, res) => {
    console.log('req params', req.body);
    Order.findAll({ where: { chefId: req.body.chefId, delivered: false } })
    .then(orders => {
      // console.log('controller shows these resulting orders:', orders);
      res.json(orders);
    })
    .catch(err => { console.error('Error fetching chefs orders', err); });
  },

  getUserOrders: (req, res) => {
    console.log('req params', req.body);
    Order.findAll({ where: { userId: req.body.userId } })
    .then(orders => {
      // console.log('controller shows these resulting orders:', orders);
      res.json(orders);
    })
    .catch(err => { console.error('Error fetching users orders', err); });
  },

  getAllOrders: (req, res) => {
    console.log('Im getting pinged!');
    Order.findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => { console.error('Error fetching orders', err); });
  },

  updateDeliveryStatus: (req, res) => {

    Order.findOne({ where: { id: req.body.id } })
    .then( order => {
      console.log('found order: ', order);
      if(order) {
        order.updateAttributes({
          delivered: true,
        })
        .then( updatedOrder => {
          res.json(updatedOrder);
        });
      } else {
        res.send('order does not exist');
      }
    })
    .error( err=> console.log(err));
  },

};
