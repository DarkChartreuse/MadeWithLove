import React from 'react';
import { connect } from 'react-redux';


const Profile = ({ loginUser }) => (
  <div className="container">
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Profile</h3>
        <ul>
          <li>First Name: {loginUser.firstName}</li>
          <li>Last Name: {loginUser.lastName}</li>
          <li>Description: {loginUser.description}</li>
          <li>Address: {loginUser.address} </li>
        </ul>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ loginUser }) => ({ loginUser });

export default connect(mapStateToProps, null)(Profile);

Profile.propTypes = {
  loginUser: React.PropTypes.object,
};
