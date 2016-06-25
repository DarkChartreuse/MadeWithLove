import React from 'react';
import { render } from 'react-dom';

// React Router & React Router Redux
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { connect, Provider } from 'react-redux';


import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// containers and presentational components
import App from './app/App';
import Search from './search/Search';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import Basicsearch from './search/Basicsearch';
import Mealview from './mealview/Mealview';
import Review from './review/Review';
import ChefDashboard from './chef/ChefDashboard';

// const defaultState = {
//   quantity: 0,
// };

const logger = createLogger();
// add 2nd argument for preloaded state
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/review" component={Review} />
      </Route>
        <Route path="/mealview" component={Mealview} />
        <Route path="/chefdashboard" component={ChefDashboard} />
        <Route path="/search" component={Search} />
    </Router>
  </Provider>
), document.getElementById('app'));
