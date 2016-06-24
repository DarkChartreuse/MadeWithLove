import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // a reducer 1,
  // a reducer 2,
  routing: routerReducer,
});

export default rootReducer;
