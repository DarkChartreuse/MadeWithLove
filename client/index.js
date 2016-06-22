import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './app/App'
import Search from './search/Search'
import Signup from './signup/Signup'
import Signin from './signin/Signin'
import Basicsearch from './search/Basicsearch'
import Mealview from './mealview/Mealview'

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
	  <Route path='/basicsearch' component={Basicsearch} />
      <Route path='/signup' component={Signup} />
      <Route path='/signin' component={Signin} />
    </Route>
    <Route path='/mealview' component={Mealview} />
    <Route path='/search' component={Search} />
  </Router>
), document.getElementById('app'));
