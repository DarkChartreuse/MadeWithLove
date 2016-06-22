import React from 'react';
import {Link} from 'react-router'
import Search from '../search/Search'

export default class App extends React.Component {
	render() {
    let img = 'https://goo.gl/GAtbcS';
		return (
      <div>
      <nav className="#ffb74d orange lighten-2">
          <ul>
            <li style={{display: 'inline', marginRight:'10px'}}><Link to="/signup" activeClassName="active">Sign-up</Link></li>          
            <li style={{display: 'inline', marginRight:'10px'}}><Link to="/signin" activeClassName="active">Sign-in</Link></li>
          </ul>
      </nav>
      <Search/>
      {this.props.children}
      </div>
		)
	}
};