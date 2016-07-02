import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

export default class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: undefined,
    }
  }

  componentDidMount() {
    // if(this.props.loginUser.firstName) {
    // 	axios.post('/api/getRec', this.props.loginUser.userID)
    // 	.then( results => {
    // 		this.state.results = results;
    // 	})
    //   .error( err => console.log(err));
    // }
  }

  render() {
  	return (
      <div>
        <h3>Your Recommendations</h3>
  	    { this.state.results && <div>we have results!</div> }
        { !this.state.results && <div>we have no results!</div> }
      </div>
  	)
  }
}
