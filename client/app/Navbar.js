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
  <nav className="#ffb74d orange lighten-2 black-text ">
    <ul className="menubuttons left">
      <li>
        <Link to="/">made with love</Link>
      </li>
    </ul>
    <ul className="menubuttons right">
      <li>
        {(!this.props.loginUser.isChef) ?
          '' :
          <div>
            <a onTouchTap={this.handleOpen}>Add a Meal</a>
            <Dialog
              title="Add a Meal"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
              <AddAMeal handleClose={this.handleClose}/>
            </Dialog>
          </div>
        }
      </li>
      <li>
        {(!this.props.loginUser.isChef) ?
          <Link to="/orderstatus">View Orders</Link> :
          <Link to="/chefstatus">View Orders</Link>
        }
      </li>
      <li>
        {(!this.props.loginUser.first_name) ?
          <Link to="/signup" >create account</Link> :
          <a onClick={() => { browserHistory.push(`/users/${this.props.loginUser.userID}`); }}><Avatar src={this.props.loginUser.profile} size={35} /></a>
        }
      </li>
      <li>
        {(!this.props.loginUser.first_name) ?
          <Link to="/signin">login</Link> :
          <a href="/signout" onClick={() => window.localStorage.clear()}>logout</a>
        }
      </li>
    </ul>
  </nav>
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
