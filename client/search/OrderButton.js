import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { updateMeal } from '../actions';


class OrderButton extends React.Component {

  _handleSubmit() {
    console.log('the order props', this.props);
    if (!this.props.loginUser.firstName) {
      return browserHistory.push('/signin');
    }
    let data = {
      chefName: this.props.cuisine.chef,
      chefId: this.props.cuisine.chefId,
      chefEmail: this.props.cuisine.chefEmail,
      chefAddress: this.props.cuisine.chefAddress,
      chefPhone: this.props.cuisine.chefPhone,
      cuisine: this.props.cuisine.cuisine,
      food: this.props.cuisine.food,
      image: this.props.cuisine.image,
      mealId: this.props.cuisine.mealId,
      price: this.props.cuisine.price,
      quantity: this.props.cuisine.quantity,
      userName: `${this.props.loginUser.firstName} ${this.props.loginUser.lastName}`,
      userId: this.props.loginUser.userID,
      userAddress: this.props.loginUser.address,
      userPhone: this.props.loginUser.phone,
      userEmail: this.props.loginUser.email,
      orderPlaced: Date(),
    };
    
    this.props.updateMeal(data);
    localStorage.setItem('meal', JSON.stringify(data));
    browserHistory.push(`/orders/${data.mealId}`);
    

    // axios.post('/api/createorder', data)
    //   .then((response) => {
    //     console.log('da response', response);
    //     browserHistory.push(`/orders/${data.mealId}`);
    //   })
    //   .catch((error) => {
    //   });
  }

  render() {
    return (
      <button className="btn #ffb74d orange lighten-2 black-text menubuttons" onClick={this._handleSubmit.bind(this)}>Order</button>
    );
  }
};

const mapStateToProps = ({ loginUser, mealState }) => ({ loginUser, mealState });

const mapDispatchToProps = (dispatch) => {
  return {
    updateMeal: (response) => dispatch(updateMeal(response)),
  };
};

OrderButton.propTypes = {
  updateMeal: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderButton);
