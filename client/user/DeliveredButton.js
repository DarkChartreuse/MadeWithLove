import React from 'react';
import axios from 'axios';

export default class DeliveredButton extends React.Component {
  
  handleSubmit() {
  	console.log('order object delivered to my button: ', this.props.order.id);

  	axios.post('/api/deliverystatus', {id: this.props.order.id})
  	.then( result => {
      this.props.viewChefOrders(this.props.loginUser.userID);
  	  console.log('updated order: ', result);
  	})
  }

  render() {
  	return (
  	  <button onClick={this.handleSubmit.bind(this)}>Delivered</button>
  	)
  }

}