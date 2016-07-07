const Order = require('../models/index.js').orders;
const User = require('../models/index.js').users;
const elasticsearch = require('../../elasticSearch.js');

module.exports = {
  createOrder: (req, res) => {
    console.log('Hitting createOrder for in controller>>>>>', req.body);

    // elasticsearch.addOrder(req.body);

    // User.findOne({ where: { email: req.body.email } })
    // .then(result => {
      Order.create({
        // chefId: req.body.chefId,
        // mealId: req.body.mealId,
        // userId: req.body.userId,
        // food: req.body.food,
        // cuisine: req.body.cuisine,
        // description: req.body.description,
        // image: req.body.image,
        // price: req.body.price,
        // quantity: req.body.quantity,
        // userName: req.body.userName,
        // userAddress: req.body.userAddress,
        // userPhone: req.body.userPhone,
        // userEmail: req.body.userEmail,
        // chefName: req.body.chefName,
        // chefAddress: req.body.chefAddress,
        // chefPhone: req.body.chefPhone,
        // chefEmail: req.body.chefEmail,
        // mealAddedDate: req.body.mealAddedDate,
        // delivered: false,
        chef_id: req.body.chefId,
        meal_id: req.body.mealId,
        user_id: req.body.userId,
        food: req.body.food,
        cuisine: req.body.cuisine,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity,
        user_name: req.body.user_name,
        user_address: req.body.user_address,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        chef_name: req.body.chef_name,
        chef_address: req.body.chef_address,
        chef_phone: req.body.chef_phone,
        chef_email: req.body.chef_email,
        meal_added_date: req.body.meal_added_date,
        delivered: false,
      })
    .then((response) => res.send(response))
    .catch(err => { console.error('Error adding order: ', err); })
    .finally(() => {
      console.log('Chef has now added an order: ', req.body);
      res.end();
    });
  },

  updateOrder: (req, res) => {
    console.log('req params', req.params);
    Order.findOne({ where: { meal_id: req.params.id } })
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
    Order.findOne({ where: { meal_id: req.params.id } })
    .then(order => {
      console.log('we are in the order', order);
      res.json(order);
    })
    .catch(err => { console.error('Error fetching order', err); });
  },

  getChefOrders: (req, res) => {
    console.log('req params', req.body);
    Order.findAll({ where: { chef_id: req.body.chef_id, delivered: false } })
    .then(orders => {
      // console.log('controller shows these resulting orders:', orders);
      res.json(orders);
    })
    .catch(err => { console.error('Error fetching chefs orders', err); });
  },

  getUserOrders: (req, res) => {
    console.log('req params', req.body);
    Order.findAll({ where: { user_id: req.body.user_id } })
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

  updateDelivery: (req, res) => {
    console.log('PINGED UPDATE DELIVERY STATUS!!!>>>>>>>>>>>');
    Order.findOne({ where: { id: req.body.id } })
    .then( order => {
      if(order) {
        console.log('FOUND ORDER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', order);
        order.updateAttributes({
          delivered: true,
        })
        .then( updatedOrder => {
          res.json(updatedOrder);
          console.log('order delivery status updated!');
        });
      } else {
        res.send('order does not exist');
      }
    })
  }

};
