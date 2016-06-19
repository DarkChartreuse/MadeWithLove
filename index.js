import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './client/app/App';
import Search from './client/search/Search';
import Signup from './client/signup/Signup';
import Signin from './client/signin/Signin';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/search" component={Search} />
    </Route>
  </Router>
), document.getElementById('app'));
