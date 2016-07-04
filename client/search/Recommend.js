import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: undefined,
    }
  }

  componentDidMount() {
    if(this.props.loginUser.firstName) {
    	axios.post('/api/getrecommendation', {userId: this.props.loginUser.userID})
    	.then( results => {
        console.log(results.data);
    		this.state.results = results.data;
    	})
    }
  }

  render() {
  	return (
      <div>
        <h3>Your Recommendations</h3>
  	    { this.state.results && <div>we have results!</div> }
        { !this.state.results && <div>want some recommendations? <Link to='/search'>click here</Link></div> }
      </div>
  	)
  }
}
