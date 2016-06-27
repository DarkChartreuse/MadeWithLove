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
        context.props.loggy(response);
        browserHistory.push('/');
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

export default connect(null, mapDispatchToProps)(Signin);
