import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

// containers and presentational components
import App from './app/App';
import Search from './search/Search';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import Basicsearch from './search/Basicsearch';
import Mealview from './mealview/Mealview';

const logger = createLogger();

const store = createStore(combineReducers(reducers), applyMiddleware(thunk, logger));
const history = syncHistoryWithStore(browserHistory, store);

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
