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

const saveSearchQuery = (state = {cuisine: ''}, action) => {
  switch (action.type) {
    case 'SAVE_SEARCH_QUERY':
      return Object.assign({}, state, {
        cuisine: action.data
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
    default:
      return state
  }
};

const rootReducer = combineReducers({
  toggleQuantity,
  saveSearchQuery,
  orders,
  routing: routerReducer,
});

export default rootReducer;
