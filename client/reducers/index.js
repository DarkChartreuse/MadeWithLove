import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const toggleQuantity = (state = {quantity: 0, price: 15}, action) => {
  switch (action.type) {
    case 'INCREMENT_QUANTITY':
      return Object.assign({}, state, {
        quantity: state.quantity+1
      });
    case 'DECREMENT_QUANTITY':
      return Object.assign({}, state, {
        quantity: state.quantity-1
      });
    default:
      return state;
  }
};

const toggleVegan = (state = {}, action) => {
  switch(action.type) {
    case 'TOGGLE_VEGAN':
      return Object.assign({}, state, {
        vegan: !state.vegan
      });
    default:
      return state;
  }
};

const orders = (state = {isFetching: false, result: [], error: null}, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        orders: action.result
      })
    case 'FETCH_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: 'Oops'
      })
    case 'CHEF_MEALS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        chefMeals: action.result
      })
    case 'CHEF_ORDERS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        chefOrders: action.result
      })
    case 'USER_ORDERS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        userOrders: action.result
      })
    default:
      return state
  }
};

const mealInitialState = JSON.parse(localStorage.getItem('meal'));

const mealState = (state = mealInitialState, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_MEAL':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};


const toggleAuth = (state = { isSignIn: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_AUTHBTN':
      return Object.assign({}, state, {
        isSignIn: !state.isSignIn,
      });
    default:
      return state;
  }
};


const userInfoState = {
  userID: Number(localStorage.getItem('name')),
  firstName: localStorage.getItem('firstName'),
  lastName: localStorage.getItem('lastName'),
  description: localStorage.getItem('description'),
  phone: localStorage.getItem('phone'),
  address: localStorage.getItem('address'),
  zip: localStorage.getItem('zip'),
  isChef: JSON.parse(localStorage.getItem('isChef')),
};


const loginUser = (state = userInfoState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        userID: action.data.id,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        email: action.data.email,
        description: action.data.description,
        phone: action.data.phone,
        address: action.data.address,
        zip: action.data.zip,
        isChef: action.data.chef,
        profile: action.data.profile,
      });
    case 'UPDATE_PROFILE':
      return Object.assign({}, state, {
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        email: action.data.email,
        password: action.data.password,
        description: action.data.description,
        phone: action.data.phone,
        address: action.data.address,
        zip: action.data.zipcode,
        profile: action.data.profile,
      });
    case 'LOGOUT_USER':
      return {};
    default:
      return state;
  }
};



const rootReducer = combineReducers({
  toggleQuantity,
  toggleVegan,
  mealState,
  orders,
  toggleAuth,
  loginUser,
  routing: routerReducer,
});

export default rootReducer;
