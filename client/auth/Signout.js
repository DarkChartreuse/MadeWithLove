import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
// import { connect } from 'react-redux';


export default class Signout extends React.Component {
  componentWillMount() {
    
    axios.get('/api/auth/signout')
    .then((response) => {
      console.log('signout response', response);
    });
  }

  componentDidMount() {
    browserHistory.push('/');
  }

  render() {
    return null;
  }
}
