import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './app/App'
import Search from './search/Search'
import Signup from './signup/Signup'

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='/signup' component={Signup} />
      <Route path='/search' component={Search} />
    </Route>
  </Router>
), document.getElementById('app'));
