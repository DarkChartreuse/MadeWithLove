import React from 'react';
import { connect } from 'react-redux';
import ImageUploader from '../chef/ImageUploader';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      address: this.state.street + ' ' + this.state.city + ', ' + this.state.state + ' ' + this.state.zipcode,
      zipcode: this.state.zipcode,
      image: this.state.image,
      description: this.state.description,
    };

    this.props.updateLoginUser(userInfo);
    console.log('updated???!');

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