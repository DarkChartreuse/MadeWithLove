const User = require('./db/controllers/usersController.js');
const Meal = require('./db/controllers/mealsController.js');
const Order = require('./db/controllers/ordersController.js');
const Controller = require('./db/controllers/controller.js');
const Auth = require('./db/controllers/authController.js');


module.exports = (app) => {

  app.post('/api/users', User.createUser);
  app.get('/api/users', User.getAllUsers);
  app.get('/api/users/:id', User.getUser);
  app.delete('/api/users/:id', User.deleteUser);

  app.post('/api/meals', Auth.isLoggedIn, Meal.createMeal);
  app.get('/api/meals', Meal.getAllMeals);
  app.get('/api/meals/:id', Meal.getMeal);
  app.delete('/api/meals/:id', Meal.deleteMeal);

  app.post('/api/createOrder', Order.createOrder);

  app.get('/api/meal/:id', Controller.getMealView);

  app.post('/api/auth/sign-in', Auth.signIn);
  app.get('/signout', Auth.logOut);

};
