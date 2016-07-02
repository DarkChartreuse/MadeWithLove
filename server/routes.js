const User = require('./db/controllers/usersController.js');
const Meal = require('./db/controllers/mealsController.js');
const Order = require('./db/controllers/ordersController.js');
const Auth = require('./db/controllers/authController.js');
const Rec = require('./db/controllers/recomController.js');
const Payments = require('./payments.js');

module.exports = (app) => {
  app.route('/api/users').post(User.createUser);
  app.route('/api/users').get(User.getAllUsers);
  app.route('/api/users/:id').get(User.getUser);
  app.route('/api/users/:id').delete(User.deleteUser);
  app.post('/api/updateuser', User.updateUser);

  app.route('/api/meals').post(Auth.isLoggedIn, Meal.createMeal);
  app.route('/api/meals').get(Meal.getAllMeals);
  app.route('/api/meals/:id').get(Meal.getMeal);
  app.route('/api/meals/:id').delete(Meal.deleteMeal);

  // check login
  app.route('/api/verify').get(Auth.isLoggedIn);

  app.route('/api/createorder').post(Order.createOrder);
  // for orders from users
  app.route('/api/orders/:id').get(Order.getOrder);

  // stripe payments
  app.route('/api/payments').post(Payments.stripeCharges);

  // auth
  app.route('/api/auth/sign-in').post(Auth.signIn);
  app.route('/signout').get(Auth.logOut);
  app.post('/api/uploadimage', Meal.uploadImage);
  app.route('/*').get((req, res) => { res.redirect('/'); });

  // recommendations
  app.route('/api/getrecommendation').post(Rec.getRec);
};
