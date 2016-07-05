import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { loggy } from '../actions';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleError = this.handleError.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleError(err) {
    Materialize.toast(`${err.data.message}`, 4000);
  }
  handleSubmit(e) {
    const context = this;
    e.preventDefault();
    const obj = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post('/api/auth/sign-in', obj)
      .then((response) => {
        console.log('login response', response)
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
        browserHistory.push(`/users/${this.props.loginUser.userID}`);
      })
      .catch(this.handleError);
  }
  render() {
    return (
      <div className="container row">
        <div className="col s8 offset-s2 input-field">
        <h3>login</h3>
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="email" onChange={this.handleEmail} />
        <input type="password" placeholder="password" onChange={this.handlePassword} />
        <button className="center waves-effect waves-light btn #ffb74d orange lighten-2 menubuttons black-text" type="submit" value="Post">Submit</button>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
