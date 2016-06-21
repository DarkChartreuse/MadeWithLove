import React from 'react';
import  { Link, browserHistory } from 'react-router';
import  axios from 'axios';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '', 
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      chef: false
    }    
  }

  _handleSubmit() {
    // validation
    console.log('i was hit');
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log('checking password');
    //check if the passwords entered matches
    if (this.state.password !== this.state.passwordConfirm) {
      console.log('PASSWORDS DO NOT MATCH');
      this.setState({error: true, errorMessage: 'passwords do not match'});
    }
    console.log('checking email');
    //check if the email supplied is valid
    if (!re.test(this.state.email)) {
      this.setState({error: true, errorMessage: 'invalid email'});
    }

    console.log('getting ready to send to server:', this.state);
    // if everything passes, then do the ajax request
      if (this.state.firstName !== '' && this.state.lastName !== ''){
        console.log('setting up data:');
        var data = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
          street: this.state.street,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          chef: this.state.chef
        };

        console.log('sending to server');

        axios.post('/api/users', data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        // auth.signup(data, (resDB)=>{
        //   console.log('++++++++++signed up', resDB);
        //   location.reload();
        // });
      }
  }

  render() {
    return (
      <div id="signup" className="input-group">
        <input type="text" 
          className="form-control"
          name="email"
          placeholder="email"
          value = {this.state.email}
          onChange ={(event) => this.setState({email: event.target.value})}/>
        <input type="password"
          className="form-control"
          name="password"
          placeholder="password"
          value = {this.state.password}
          onChange ={(event) => this.setState({password: event.target.value})}/>
        <input type="password"
          className="form-control"
          name="passwordConfirm"
          placeholder="confirm password"
          value = {this.state.passwordConfirm}
          onChange ={(event) => this.setState({passwordConfirm: event.target.value})}/>          
        <p>Additional Information</p>
        <input type="text"
          className="form-control"
          name="firstname"
          placeholder="first name"
          value = {this.state.firstName}
          onChange ={(event) => this.setState({firstName: event.target.value})}/>
        <input type="text"
          className="form-control"
          name="lastname"
          placeholder="last name"
          value = {this.state.lastName}
          onChange ={(event) => this.setState({lastName: event.target.value})}/>
        <input type="text"
          className="form-control"
          name="phone"
          placeholder="phone number"
          value = {this.state.phone}
          onChange ={(event) => this.setState({phone: event.target.value})}/>
        <br />
        <input type="text"
          className="form-control"
          name="street"
          placeholder="street"
          value = {this.state.street}
          onChange ={(event) => this.setState({street: event.target.value})}/>        
          <input type="text"
          className="form-control"
          name="city"
          placeholder="city"
          value = {this.state.city}
          onChange ={(event) => this.setState({city: event.target.value})}/>
        <input type="text"
          className="form-control"
          name="state"
          placeholder="state"
          value = {this.state.state}
          onChange ={(event) => this.setState({state: event.target.value})}/>          
        <input type="text"
          className="form-control"
          name="zipcode"
          placeholder="zipcode"
          value = {this.state.zipcode}
          onChange ={(event) => this.setState({zipcode: event.target.value})}/>          

        <p>
          Are you a chef?
          {' '}
          <input 
            type='checkbox' 
            checked={this.state.chef}
            ref="isAChef"
            onChange ={(event) => this.setState({chef: event.target.value})}
          />
        </p>          
        <button className="submit-button btn-primary" onClick={this._handleSubmit.bind(this)}>Submit</button>
        <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active"> Already have an account? <b>sign in</b></span>
      </div>
    );
  }
}
