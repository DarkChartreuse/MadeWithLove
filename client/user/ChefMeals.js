import React from 'react';
import { viewChefMeals, viewChefOrders } from '../actions';
import { connect } from 'react-redux';


export default class ChefMeals extends React.Component {
  
  componentDidMount() {
  	if(this.props.loginUser.isChef) {
	  this.props.viewChefMeals(this.props.loginUser.userID);
	  this.props.viewChefOrders(this.props.loginUser.userID);
  	}

  }

  render() {
  	console.log('chefmeals this.props.orders.chefMeals: ', this.props.orders.chefMeals);
  	console.log('chefmeals this.props.orders.chefOrders: ', this.props.orders.chefOrders);

  	return (
  	  <div>
  	  {this.props.orders.chefMeals &&
  	  	<ul>
  	  	  {this.props.orders.chefMeals.map(function(meal) {
  	  	  	return<li>{meal.food}</li>;
  	  	  })}
  	  	</ul>
  	  }
  	  {this.props.orders.chefOrders &&
  	  	<ul>
  	  	  {this.props.orders.chefOrders.map(function(order) {
  	  	  	return<li>{order.food}</li>;
  	  	  })}
  	  	</ul>
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
