const User = require('./db/controllers/usersController.js');
const Meal = require('./db/controllers/mealsController.js');
const Order = require('./db/controllers/ordersController.js');
const Auth = require('./db/controllers/authController.js');
const Rec = require('./db/controllers/recomController.js');
const Payments = require('./payments.js');

module.exports = (app) => {
  app.route('/api/users').post(Auth.isLoggedIn, User.createUser);
  app.route('/api/users').get(Auth.isLoggedIn, User.getAllUsers);
  app.route('/api/users/:id').get(Auth.isLoggedIn, User.getUser);
  app.route('/api/users/:id').delete(User.deleteUser);
  app.route('/api/users/:id').put(Auth.isLoggedIn, User.updateUser);
  app.route('/api/updateusersearch').post(User.updateSearchHistory);

  app.route('/api/meals').post(Auth.isLoggedIn, Meal.createMeal);
  app.route('/api/meals').get(Auth.isLoggedIn, Meal.getAllMeals);
  app.route('/api/meals/:id').get(Meal.getMeal);
  app.route('/api/meals/:id').delete(Auth.isLoggedIn, Meal.deleteMeal);

  // check login
  app.route('/api/verify').get(Auth.isLoggedIn);

  app.route('/api/createorder').post(Auth.isLoggedIn, Order.createOrder);
  // for orders from users
  app.route('/api/orders/:id').get(Auth.isLoggedIn, Order.getOrder);
  app.route('/api/getcheforders').post(Auth.isLoggedIn, Order.getChefOrders);
  app.route('/api/getuserorders').post(Auth.isLoggedIn, Order.getUserOrders);
  app.route('/api/deliverystatus').post(Auth.isLoggedIn, Order.updateDelivery);


  // stripe payments
  app.route('/api/payments').post(Auth.isLoggedIn, Payments.stripeCharges);

  // auth
  app.route('/api/auth/sign-in').post(Auth.signIn);
  app.route('/signout').get(Auth.logOut);
  app.route('/api/uploadimage').post(Auth.isLoggedIn, Meal.uploadImage);

  // recommendations
  app.route('/api/getrecommendation').post(Auth.isLoggedIn, Rec.getRec);
};
