import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { loggy } from '../actions';
import ImageUploader from '../chef/ImageUploader';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      profile: '',
      chef: false,
    };
    this.handleError = this.handleError.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  handleError(err) {
    Materialize.toast(`Failed to create account: ${err.data.message}`, 4000);
  }

  handleProfile(uri) {
    console.log('handleprofile>>>', uri);
    this.setState({ profile: uri });
  }

  _handleSubmit() {
    // validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // check if the passwords entered matches
    if (this.state.password !== this.state.passwordConfirm) {
      Materialize.toast('passwords do not match', 4000, 'pink lighten-2');
      return;
    }
    // check if the email supplied is valid
    if (!re.test(this.state.email)) {
      Materialize.toast('invalid email address', 4000, 'pink lighten-2');
      return;
    }
    if (this.state.first_name === '' || this.state.last_name === '' || this.state.phone === '' || this.state.street === '' || this.state.city === '' || this.state.state === '' || this.state.zipcode === '') {
      Materialize.toast('Please complete all the fields', 4000, 'pink lighten-2');
      return;
    } else {
      const context = this;
        console.log('setting up data:');
        const data = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
          street: this.state.street,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          chef: this.state.chef,
          profile: this.state.profile,
        };
      axios.post('/api/users', data)
        .then((response) => {
          const data = JSON.parse(response.config.data);
          console.log('dat daaaata', data);
          axios.post('/api/auth/sign-in', data)
          .then((response) => {
            console.log('LOGIN RESPONSE', response);
            context.props.loggy(response);
            localStorage.setItem('first_name', response.data.first_name);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('last_name', response.data.last_name);
            localStorage.setItem('profile', response.data.profile);
            localStorage.setItem('description', response.data.description);
            localStorage.setItem('phone', response.data.phone);
            localStorage.setItem('address', response.data.address);
            localStorage.setItem('zip', response.data.zip);
            localStorage.setItem('isChef', response.data.chef);
            localStorage.setItem('profile', response.data.profile);
            browserHistory.push(`/users/${context.props.loginUser.userID}`);
          });
        });
    }
  }

  render() {
    return (
      <div className="container center">
        <br />
        <h3>create account</h3>
        <div className="themode signupmode">
          
          <div className="row">
          <div className="col s4">
          
          
          <input
            type="text"
            className="input-field"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
          <input
            type="password"
            className="input-field"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })}
          />
          <input
            type="password"
            className="input-field"
            name="passwordConfirm"
            placeholder="confirm password"
            value={this.state.passwordConfirm}
            onChange={(event) => this.setState({ passwordConfirm: event.target.value })}
          />     
          <input
            type="checkbox"
            id="test5"
            checked={this.state.chef}
          />
          <label
            for="test5"
            onClick={() => this.setState({ chef: !this.state.chef })}
          >Are you a chef?</label>
          <p>Please check if you want to make meals</p>
          
          </div>
          <div className="col s4"> 
          <input
            type="text"
            className="input-field"
            name="first_name"
            placeholder="first name (required)"
            value={this.state.first_name}
            onChange={(event) => this.setState({ first_name: event.target.value })}
          />
          <input
            type="text"
            className="input-field"
            name="last_name"
            placeholder="last name (required)"
            value={this.state.last_name}
            onChange={(event) => this.setState({ last_name: event.target.value })}
          />
          <input
            type="text"
            className="input-field"
            name="phone"
            placeholder="phone number"
            value={this.state.phone}
            onChange={(event) => this.setState({ phone: event.target.value })}
          />
          <br />
          <input
            type="text"
            className="input-field"
            name="street"
            placeholder="street"
            value={this.state.street}
            onChange={(event) => this.setState({ street: event.target.value })}
          />
          <input
            type="text"
            className="input-field"
            name="city"
            placeholder="city"
            value={this.state.city}
            onChange={(event) => this.setState({ city: event.target.value })}
          />
          <input
            type="text"
            className="input-field"
            name="state"
            placeholder="state"
            value={this.state.state}
            onChange={(event) => this.setState({ state: event.target.value })}
          />
          <input
            type="text"
            className="input-field"
            name="zipcode"
            placeholder="zipcode"
            value={this.state.zipcode}
            onChange={(event) => this.setState({ zipcode: event.target.value })}
          />
          </div>
          <div className="col s4">
          <ImageUploader handleImage={this.handleProfile}/>
          </div>
        
        </div>
        <div className="row center">
          <button
            className="center btn black-text menubuttons"
            onClick={this._handleSubmit.bind(this)}
          >Sign Up</button>
        </div>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggy: (response) => dispatch(loggy(response)),
  };
};

const mapStateToProps = ({ loginUser }) => ({ loginUser });

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

// <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active"> Already have an account? <b>sign in</b></span>