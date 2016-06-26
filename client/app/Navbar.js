import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Navbar = ({ loginUser }) => (
  <nav className="#ffb74d orange lighten-2 black-text ">
    <ul className="right menubuttons ">
      <li>
        {(!loginUser.userName) ?
          <Link to="/signup" >create account</Link> :
          <Link to="/profile">{loginUser.userName}</Link>
        }
      </li>
      <li>
        {(!loginUser.userName) ?
          <Link to="/signin" >login</Link> :
          <Link to="/logout" >logout</Link>
        }
      </li>
    </ul>
  </nav>
);

const mapStateToProps = ({ loginUser }) => ({ loginUser });

Navbar.propTypes = {
  loginUser: React.PropTypes.object,
};

export default connect(mapStateToProps)(Navbar);
