import React from 'react';
import {Link} from 'react-router'

export default class App extends React.Component {
	render() {
		return (
			<div>
			  <h1>trying stuff</h1>
        <ul role="nav">
        <li style={{display: 'inline', marginRight:'10px'}}><Link to="/search" activeClassName="active">Search</Link></li>
        <li style={{display: 'inline', marginRight:'10px'}}><Link to="/signup" activeClassName="active">Sign-up</Link></li>
        </ul>
        {this.props.children}
			</div>
		)
	}
};