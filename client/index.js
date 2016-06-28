// css
import './assets/styles/app.scss';

import React from 'react';
import { render } from 'react-dom';

// React Router & React Router Redux
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// containers and presentational components
import App from './app/App';
import Search from './search/Search';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Mealview from './mealview/Mealview';
import SearchBar from './search/SearchBar';
import AddAMeal from './chef/AddAMeal';
import Profile from './user/Profile';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Search} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/addmeal" component={AddAMeal} />
        <Route path="/search" component={SearchBar} />
        <Route path="/mealview" component={Mealview} />
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));


