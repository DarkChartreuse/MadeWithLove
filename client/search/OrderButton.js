import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { updateMeal } from '../actions';


class OrderButton extends React.Component {

  _handleSubmit() {
    console.log('the order props', this.props);
    if (!this.props.loginUser.first_name) {
      return browserHistory.push('/signin');
    }
    let data = {
      chef_name: this.props.cuisine.chef,
      chefId: this.props.cuisine.chefId,
      chef_email: this.props.cuisine.chef_email,
      chef_address: this.props.cuisine.chef_address,
      chef_phone: this.props.cuisine.chef_phone,
      cuisine: this.props.cuisine.cuisine,
      food: this.props.cuisine.food,
      image: this.props.cuisine.image,
      mealId: this.props.cuisine.mealId,
      price: this.props.cuisine.price,
      quantity: this.props.cuisine.quantity,
      user_name: `${this.props.loginUser.first_name} ${this.props.loginUser.last_name}`,
      userId: this.props.loginUser.userID,
      user_address: this.props.loginUser.address,
      user_phone: this.props.loginUser.phone,
      user_email: this.props.loginUser.email,
      order_placed: Date(),
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
    console.log('this.props.cuisine: ', this.props.cuisine);
    return (
      <button className="btn #ffb74d orange lighten-2 black-text menubuttons" onClick={this._handleSubmit.bind(this)}>${this.props.cuisine.price}</button>
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
