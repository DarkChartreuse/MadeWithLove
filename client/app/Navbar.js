import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logoutuser } from '../actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    return (
      <div className="wrapper">
        <nav className="flex-nav">
          <ul>
            <li className="leftlogo">
              <Link to="/">savory</Link>
            </li>
            <li>
              {(!this.props.loginUser.isChef) ?
                '' :
                <Link to="/addmeal" >ADD A MEAL</Link>
              }
            </li>
            <li>
              {(!this.props.loginUser.first_name) ? null : (!this.props.loginUser.isChef)}
              {(!this.props.loginUser.isChef) ?
                <Link to="/orderstatus">Order Status</Link> :
                <Link to="/chefstatus">Order Status</Link>
              }
            </li>
            <li className="imageli">
              {(!this.props.loginUser.first_name) ?
                <Link to="/signup" >Sign Up</Link> :
                <a
                  onClick={
                    () => { browserHistory.push(`/users/${this.props.loginUser.userID}`); }}
                >
                  <img className="circle" src={this.props.loginUser.profile} alt="login" />
                </a>
              }
            </li>
            <li>
              {(!this.props.loginUser.first_name) ?
                <Link to="/signin">Log In</Link> :
                <a href="/signout" onClick={() => window.localStorage.clear()}>Log out</a>
              }
            </li>
          </ul>
        </nav>
      </div>
  );
  }
}

const mapStateToProps = ({ loginUser }) => ({ loginUser });

const mapDispatchToProps = (dispatch) => ({
  logoutuser: () => dispatch(logoutuser()),
});


Navbar.propTypes = {
  loginUser: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
