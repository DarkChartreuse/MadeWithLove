import React from 'react';
import axios from 'axios';

export default class Recommend extends React.Component {

  if(this.props.loginUser.firstName) {
  	axios.post('/api/getRecs', this.props.loginUser.userID)
  	.then( results => {
  		//save results 
  	})
  }

  render() {
  	return (
  	  results.map()

  	)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = ({ loginUser }) => ({ loginUser });


export default connect(mapStatetoProps, mapDispatchToProps)(Recommend);