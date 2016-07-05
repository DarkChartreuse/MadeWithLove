import React from 'react';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import { updateProfile, viewChefMeals } from '../actions';

class Profile extends React.Component {
            // <div><img src={loginUser.image} /></div>

  render() {
    var loginUser = this.props.loginUser;
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <h3>Profile</h3>
            <ul>
              <li>First Name: {loginUser.first_name}</li>
              <li>Last Name: {loginUser.last_name}</li>
              <li>Address: {loginUser.address}</li>
              <li>Description: {loginUser.description}</li>
              <li>Phone: {loginUser.phone} </li>
              <li>Image: <img src={loginUser.profile} style={{width: '300px'}}/></li>
            </ul>
          </div>
          <EditForm updateLoginUser={this.props.updateLoginUser} loginUser={loginUser}/>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ loginUser }) => ({ loginUser });

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginUser: (userData) => dispatch({type: 'UPDATE_PROFILE', data: userData}),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

Profile.propTypes = {
  loginUser: React.PropTypes.object,
};
