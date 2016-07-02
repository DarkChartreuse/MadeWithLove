import React from 'react';
import { viewChefMeals, viewChefOrders } from '../actions';
import { connect } from 'react-redux';
import DeliveredButton from './DeliveredButton';


export default class ChefMeals extends React.Component {
  
  componentDidMount() {
  	if(this.props.loginUser.isChef) {
	  this.props.viewChefMeals(this.props.loginUser.userID);
	  this.props.viewChefOrders(this.props.loginUser.userID);
  	}

  }

  reloadOrders() {
    console.log('hi from reload orders');

  }

  render() {
  	console.log('chefmeals this.props.orders.chefMeals: ', this.props.orders.chefMeals);
  	console.log('chefmeals this.props.orders.chefOrders: ', this.props.orders.chefOrders);

  	return (
  	  <div>
  	  {this.props.orders.chefMeals &&
  	  	<div>
  	  	  <h3>Your Meals</h3>
	  	  	{this.props.orders.chefMeals.map(function(meal) {
	  	  	  return<li>Name: {meal.food} Price: {meal.price} Image: {meal.image}</li>;
	  	  	})}
  	  	</div>
  	  }
  	  {this.props.orders.chefOrders &&
  	  	<div>
  	  	  <h3>Your Orders</h3>
  	  	  <ul>
  	  	    {this.props.orders.chefOrders.map(function(order) {
  	  	  	  return<li><div>{order.food}</div><DeliveredButton order={order} /></li>;
  	  	    })}
  	  	  </ul>
  	  	</div>
  	  }
  	  </div>
  	)
  }
}

const mapStateToProps = ({ loginUser, orders }) => ({ loginUser, orders });

const mapDispatchToProps = (dispatch) => {
  return {
    viewChefMeals: (chefID) => dispatch(viewChefMeals(chefID)),
    viewChefOrders: (chefID) => dispatch(viewChefOrders(chefID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChefMeals);
