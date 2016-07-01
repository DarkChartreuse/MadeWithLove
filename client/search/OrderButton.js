import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class OrderButton extends React.Component {

  _handleSubmit() {
    console.log('this props cuisine', this.props);
    let data = {
      chefName: this.props.cuisine.chef,
      chefId: this.props.cuisine.chefId,
      chefEmail: this.props.cuisine.chefEmail,
      chefAddress: this.props.cuisine.chefAddress,
      chefPhone: this.props.cuisine.chefPhone,
      food: this.props.cuisine.food,
      image: this.props.cuisine.image,
      mealId: this.props.cuisine.mealId,
      price: this.props.cuisine.price,
      quantity: this.props.cuisine.quantity,
      userId: this.props.loginUser.userID,
      userAddress: this.props.loginUser.address,
      userPhone: this.props.loginUser.phone,
      userEmail: this.props.loginUser.email,
      orderPlaced: Date(),
    };

    axios.post('/api/createorder', data)
      .then((response) => {
        console.log('da response', response);
        browserHistory.push(`/orders/${data.mealId}`);
      })
      .catch((error) => {
      });
  }

  render() {
    return (
      <button className="btn #ffb74d orange lighten-2 black-text menubuttons" onClick={this._handleSubmit.bind(this)}>Order</button>
    );
  }
};

const mapStateToProps = ({ loginUser }) => ({ loginUser });

export default connect(mapStateToProps, null)(OrderButton);
