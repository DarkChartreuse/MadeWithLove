import React from 'react';
import {Link} from 'react-router'

export default class App extends React.Component {
	render() {
		return (
			<div>
        <div className="jumbotron">
          <h1>Made With Love</h1>
          <p>Home made meals delivered</p>
          <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
        </div>
          <ul role="nav" className="nav nav-tabs">
            <li style={{display: 'inline', marginRight:'10px'}}><Link to="/signup" activeClassName="active">Sign-up</Link></li>          
            <li style={{display: 'inline', marginRight:'10px'}}><Link to="/signin" activeClassName="active">Sign-in</Link></li>
            <li style={{display: 'inline', marginRight:'10px'}}><Link to="/search" activeClassName="active">Search Chefs</Link></li>
          </ul>
          {this.props.children}
			</div>
		)
	}
};