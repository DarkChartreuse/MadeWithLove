import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class OrderButton extends React.Component {

  _handleSubmit() {
    
    let data = {
      chef: this.props.cuisine.chef,
      chefId: this.props.cuisine.chefId,
      food: this.props.cuisine.food,
      image: this.props.cuisine.image,
      mealId: this.props.cuisine.mealId,
      price: this.props.cuisine.price,
      userId: this.props.loginUser.userID,
      userAddress: this.props.loginUser.address,
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
