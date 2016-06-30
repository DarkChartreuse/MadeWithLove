import React from 'react';
import axios from 'axios';

export default class OrderButton extends React.Component {
  
  _handleSubmit() {
    console.log('order from meals prop', this.props)
    let data = {
      chef: this.props.cuisine.chef,
      chefId: this.props.cuisine.chefId,
      food: this.props.cuisine.food,
      image: this.props.cuisine.image,
      mealId: this.props.cuisine.mealId,
      price: this.props.cuisine.price,
      usersID: TO_BE_FILLED,
      rating: TO_BE_ADDED_BY_USER,
    };


    console.log(data);

    axios.post('/api/createOrder', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });    
  }

  render() {
    let btn = "";
     if(this.props.isInStock) {
        btn = (
             <button className="submit-button btn-primary btn-xs active" onClick={this._handleSubmit.bind(this)}>Order</button>
        );
      } else {
        btn = (
             <button className="submit-button btn-primary btn-xs disabled" onClick={this._handleSubmit.bind(this)}>Order</button>
        );
      } 
    return btn;
  }
};