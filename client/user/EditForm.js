import React from 'react';
import { connect } from 'react-redux';
import ImageUploader from '../chef/ImageUploader';
import axios from 'axios';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.loginUser.userID,
      firstName: this.props.loginUser.firstName,
      lastName: this.props.loginUser.lastName,
      email: this.props.loginUser.email,
      password: this.props.loginUser.password,
      phone: this.props.loginUser.phone,
      street: this.props.loginUser.street,
      city: this.props.loginUser.city,
      state: this.props.loginUser.state,
      zipcode: this.props.loginUser.zipcode,
      image: this.props.loginUser.image,
      description: this.props.loginUser.description,
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleStreet = this.handleStreet.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstName(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastName(e) {
    this.setState({ lastName: e.target.value });
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
  handleStreet(e) {
    this.setState({ street: e.target.value});
  }
  handleCity(e) {
    this.setState({ city: e.target.value});
  }
  handleState(e) {
    this.setState({ state: e.target.value});
  }
  handleZip(e) {
    this.setState({ zipcode: e.target.value});
  }
  handleDescription(e) {
    this.setState({ description: e.target.value});
  }
  handleImage(uri) {
    console.log('handleimage>>>', uri);
    this.setState({ image: uri });
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
        userID: this.state.userID,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        description: this.state.description,
        phone: this.state.phone,
        password: this.state.password,
        address: this.state.street + ' ' + this.state.city + ', ' + this.state.state + ' ' + this.state.zipcode,
        zip: this.state.zipcode,
        image: this.state.image,
      };

      //update loginUser in the store
      this.props.updateLoginUser(userInfo);

      //update the user info in postgres
      axios.post('/api/updateUser', userInfo)
        .then(function (response) {
          console.log(response);
        })
        .catch( err => { console.log('Failed to create account') });
  }


  render() {
    var loginUser = this.props.loginUser;
    return (
      <div>
      <form action='' onSubmit={this.handleSubmit}>
        <input type='text' placeholder={this.state.firstName} onChange={this.handleFirstName}/>
        <input type='text' placeholder={this.state.lastName} onChange={this.handleLastName}/>
        <input type='text' placeholder={this.state.email} onChange={this.handleEmail}/>
        <input type='text' placeholder='Password'onChange={this.handlePassword}/>
        <input type='text' placeholder='Confirm Password'/>
        <input type='text' placeholder={this.state.phone}onChange={this.handlePhone}/>
        <input type='text' placeholder={this.state.street}onChange={this.handleStreet}/>
        <input type='text' placeholder={this.state.city}onChange={this.handleCity}/>
        <input type='text' placeholder={this.state.state}onChange={this.handleState}/>
        <input type='text' placeholder={this.state.zipcode}onChange={this.handleZip}/>
        <input type='submit'/>
      </form>
      <div>Set Profile Picture<ImageUploader handleImage={this.props.putImageInLoginUserStore}/></div>
      </div>
    )
  }
};

      // firstName: '',
      // lastName: '',
      // email: '',
      // password: '',
      // passwordConfirm: '',
      // phone: '',
      // street: '',
      // city: '',
      // state: '',
      // zipcode: '',