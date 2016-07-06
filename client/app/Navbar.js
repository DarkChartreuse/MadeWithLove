import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory }  from 'react-router';
import { logoutuser } from '../actions';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import AddAMeal from '../chef/AddAMeal';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    console.log('this is my image!', this.props.loginUser.profile);
    return (
      <div className="navbar-fixed">
      
      
  <nav>
    <ul className="left">
      <li>
        <Link to="/">made with love</Link>
      </li>
    </ul>
    <ul className="right">
      <li>
        {(!this.props.loginUser.isChef) ?
          '' :
          <Link to="/addmeal" >ADD A MEAL</Link>
        }
      </li>
      <li>
        {(!this.props.loginUser.first_name) ? null : (!this.props.loginUser.isChef) ?
          <Link to="/orderstatus">Order Status</Link> :
          <Link to="/chefstatus">Order Status</Link>
        }
      </li>
      <li>
        {(!this.props.loginUser.first_name) ?
          <Link to="/signup" >Sign Up</Link> :
          <a onClick={() => { browserHistory.push(`/users/${this.props.loginUser.userID}`); }}>
          <img className="circle" src={this.props.loginUser.profile} /></a>
        }
      </li>
      <li>
        {(!this.props.loginUser.first_name) ?
          <Link to="/signin">Log In</Link> :
          <a href="/signout" onClick={() => window.localStorage.clear()}>logout</a>
        }
      </li>
    </ul>
  </nav>
  </div>
  );
  }
}

const mapStateToProps = ({ loginUser }) => ({ loginUser });

const mapDispatchToProps = (dispatch) => {
  return {
    logoutuser: () => dispatch(logoutuser()),
  };
};


Navbar.propTypes = {
  loginUser: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


// <Avatar src={this.props.loginUser.profile} size={35} />