import React from 'react';
import {Link} from 'react-router'
import Basicsearch from '../search/Basicsearch'

export default class App extends React.Component {
	render() {
    let img = 'https://goo.gl/GAtbcS';
		return (
      <div>
      <nav className="#ffb74d orange lighten-2">
          <ul>
            <li style={{display: 'inline', marginRight:'10px'}}><Link to="/signup" >Sign-up</Link></li>          
            <li style={{display: 'inline', marginRight:'10px'}}><Link to="/signin" >Sign-in</Link></li>
          </ul>
      </nav>
      {this.props.children}
      <Basicsearch/>
      </div>
		)
	}
};