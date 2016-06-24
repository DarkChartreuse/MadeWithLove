import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Signin extends React.Component {
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
    e.preventDefault();
    const obj = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post('/api/auth/sign-in', obj)
      .then((response) => {
        browserHistory.push('/');
      })
      .catch(this.handleError);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input-group">
        <input type="text" placeholder="email" onChange={this.handleEmail} />
        <input type="password" placeholder="password" onChange={this.handlePassword} />
        <button type="submit" value="Post">Submit</button>
      </form>
    );
  }
}
