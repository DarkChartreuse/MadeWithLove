import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './app/App'
import Search from './search/Search'
import Advsearch from './search/Advsearch'
import Signup from './signup/Signup'
import Signin from './signin/Signin'
import Mealview from './mealview/Mealview'

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
	  <Route path='/search' component={Search} />
      <Route path='/signup' component={Signup} />
      <Route path='/signin' component={Signin} />
    </Route>
    <Route path='/mealview' component={Mealview} />
  </Router>
), document.getElementById('app'));
