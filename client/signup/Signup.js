import React from 'react';
import  { Link, browserHistory } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="signup">
        <input type="text"
          name="firstname"
          placeholder="first name"
          value = {this.state.firstName}
          onChange ={(event) => this.setState({firstName: event.target.value})}/>
        <input type="text"
          name="lastname"
          placeholder="last name"
          value = {this.state.lastName}
          onChange ={(event) => this.setState({lastName: event.target.value})}/>
        <input type="password"
          name="password"
          placeholder="password"
          value = {this.state.password}
          onChange ={(event) => this.setState({password: event.target.value})}/>
        <input type="password"
          name="passwordConfirm"
          placeholder="confirm password"
          value = {this.state.passwordConfirm}
          onChange ={(event) => this.setState({passwordConfirm: event.target.value})}/>
        <input type="text"
          name="email"
          placeholder="email"
          value = {this.state.email}
          onChange ={(event) => this.setState({email: event.target.value})}/>
        <button className="submit-button" onClick={this._handleSubmit.bind(this)}>Submit</button>
         <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active">already have an account ? <b>sign in</b></span>
      </div>
    );
  }
}
