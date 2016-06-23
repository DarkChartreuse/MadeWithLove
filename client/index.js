import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
// import * as reducers from './reducers';

// containers and presentational components
import App from './app/App';
import Search from './search/Search';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import Basicsearch from './search/Basicsearch';
import Mealview from './mealview/Mealview';

const initialState = {
  quantity: 0,
}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {
        quantity: state.quantity + 1,
        });
    case 'DECREMENT':
      return Object.assign({}, state, {
        'quantity': state.quantity - 1,
              });
    default:
      return state;
  }
}

const logger = createLogger();
const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer
  }), applyMiddleware(thunk, logger)
);
const history = syncHistoryWithStore(browserHistory, store);

let Counter = ({counter, onIncrement, onDecrement}) =>
 (<div>
    <div>{counter}</div>
    <button onClick={onDecrement}>-</button>
    <button onClick={onIncrement}>+</button>
  </div>);
const mapStateToProps = (state) => {
  return {counter: state.counter};
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({type: 'INCREMENT'}),
    onDecrement: () => dispatch({type: 'DECREMENT'})
  }
}
Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
      <IndexRoute component={Basicsearch} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/mealview' component={Mealview} />
        <Route path='/search' component={Search} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
