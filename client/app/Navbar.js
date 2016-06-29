import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logoutuser } from '../actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
          <Link to="/addmeal">add a meal</Link>
        }
      </li>
      <li>
        {(!this.props.loginUser.firstName) ?
          <Link to="/signup" >create account</Link> :
          <Link to="/profile">{this.props.loginUser.firstName.toLowerCase()}</Link>
        }
      </li>
      <li>
        {(!this.props.loginUser.firstName) ?
          <Link to="/signin" >login</Link> :
          <a href="/signout" onClick={() => { window.localStorage.clear(); this.props.logoutuser(); }}>logout</a>
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
