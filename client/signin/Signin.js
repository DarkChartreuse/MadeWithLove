import React from 'react';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _handleEmail() {
    console.log('handle email')
  }
  _handlePassword() {
    console.log('handle password')    
  }
  _handleSubmit() {
    console.log('I was clicked to sign in')
  }

  render() {
    return (
      <div className="input-group">
        <input type="text"
               className="form-control"  
               name="email"
               placeholder="email"
               onChange={this._handleEmail.bind(this)}
               value={this.state.email} />
        <input type="password"
               className="form-control"  
               name="password"
               placeholder="password"
               onChange={this._handlePassword.bind(this)}
               value={this.state.password} /><br/>
        <button className="submit-button btn-primary" onClick={this._handleSubmit.bind(this)}>Submit</button>
        <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active"> Not a user? <b>sign up</b></span>
      </div>
    );
  }
}
