import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import EditForm from './EditForm';
import { updateProfile, viewChefMeals } from '../actions';

class Profile extends React.Component {
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
    var loginUser = this.props.loginUser;
    // const actions = [
    //   <FlatButton
    //     label="Ok"
    //     primary={true}
    //     keyboardFocused={true}
    //     onTouchTap={this.handleClose}/>,
    // ];

    return (
      <div className="container center">
        <div className="row">
          <div className="col s6 offset-s3">

            <h3>Profile</h3>
            <div className="themode profilemode">
              <Avatar src={loginUser.profile} size={60} />
              <ul>
                <li>First Name: {loginUser.first_name}</li>
                <li>Last Name: {loginUser.last_name}</li>
                <li>Address: {loginUser.address}</li>
                <li>Description: {loginUser.description}</li>
                <li>Phone: {loginUser.phone} </li>
              </ul>
            </div>
            
          <Dialog
            title="Edit Profile"
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <EditForm updateLoginUser={this.props.updateLoginUser} loginUser={loginUser} handleClose={this.handleClose}/>
          </Dialog>
          </div>
          <RaisedButton label="Edit Profile" onTouchTap={this.handleOpen} />
          
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
