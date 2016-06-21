import React from 'react';
import  axios from 'axios';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }

  _handleEmail(e) {
    this.setState({email: e.target.value});
  }
  _handlePassword(e) {
    this.setState({password: e.target.value});
  }
  
  _handleSubmit(e) {
    e.preventDefault();
    var obj = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(this.state);
    //post obj to server
    axios.post('/api/auth/sign-in', obj)
      .then(function (response) {
        if(response.status === 200) {
          next();
        } else if (response.status === 400) {
          console.log('user is not in database');
        }
      })
      .catch((error) => {
          console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)} className='input-group'>
        <input type='text' placeholder='email' onChange={this._handleEmail.bind(this)} />
        <input type='password' placeholder='password' onChange={this._handlePassword.bind(this)}/>
        <button type='submit' value='Post'>Submit</button>
      </form>
    );
  }
}
