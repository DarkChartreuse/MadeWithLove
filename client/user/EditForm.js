import React from 'react';
import { connect } from 'react-redux';
import ImageUploader from '../chef/ImageUploader';
import axios from 'axios';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.loginUser.userID,
      first_name: this.props.loginUser.first_name,
      last_name: this.props.loginUser.last_name,
      email: this.props.loginUser.email,
      password: this.props.loginUser.password,
      phone: this.props.loginUser.phone,
      address: this.props.loginUser.address,
      profile: this.props.loginUser.profile,
      description: this.props.loginUser.description,
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstName(e) {
    this.setState({ first_name: e.target.value });
  }
  handleLastName(e) {
    this.setState({ last_name: e.target.value });
  }
  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  handlePhone(e) {
    this.setState({ phone: e.target.value });
  }
  handleAddress(e) {
    this.setState({ address: e.target.value});
  }
  handleDescription(e) {
    this.setState({ description: e.target.value});
  }
  handleProfile(uri) {
    console.log('handleprofile>>>', uri);
    this.setState({ profile: uri });
  }

  handleSubmit(e) {
    e.preventDefault();
    // validation
    // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // check if the passwords entered matches
    // if (this.state.password !== this.state.passwordConfirm) {
    //   console.log('passwords do not match');
    // }
    // check if the email supplied is valid
    // if (!re.test(this.state.email)) {
    //   console.log('invalid email address', this.state.email);
    // } else {
      const userInfo = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        description: this.state.description,
        phone: this.state.phone,
        password: this.state.password,
        address: this.state.address,
        zip: this.state.zipcode,
        profile: this.state.profile,
      };

      //update loginUser in the store
      this.props.updateLoginUser(userInfo);

      //update the user info in postgres
      axios.put(`/api/users/${this.state.userID}`, userInfo)
        .then(function (response) {
          console.log(response);
        })
        .catch( err => { console.log('Failed to update account') });

      this.props.handleClose();
  }


  render() {
    var loginUser = this.props.loginUser;
    return (
    <div>
      <form action='' onSubmit={this.handleSubmit}>
        <input type='text' placeholder={this.state.first_name} onChange={this.handleFirstName}/>
        <input type='text' placeholder={this.state.last_name} onChange={this.handleLastName}/>
        <input type='text' placeholder={this.state.email} onChange={this.handleEmail}/>
        <input type='text' placeholder='Password'onChange={this.handlePassword}/>
        <input type='text' placeholder='Confirm Password'/>
        <input type='text' placeholder={this.state.phone}onChange={this.handlePhone}/>
        <input type='text' placeholder={this.state.address}onChange={this.handleAddress}/>
        <button type="submit">Submit</button>
      </form>
      <div><ImageUploader handleImage={this.handleProfile}/></div>
    </div>
    )
  }
};

      // first_name: '',
      // last_name: '',
      // email: '',
      // password: '',
      // passwordConfirm: '',
      // phone: '',
      // street: '',
      // city: '',
      // state: '',
      // zipcode: '',