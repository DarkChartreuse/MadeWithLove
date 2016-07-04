import React from 'react';
import { viewChefMeals, viewChefOrders } from '../actions';
import { connect } from 'react-redux';
import DeliveredButton from './DeliveredButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
          <ul>
	  	  	{ this.props.orders.chefMeals.map( function(meal) { 
            return
            <li><Card> 
              <CardMedia
                overlay={<CardTitle title={meal.food} subtitle={meal.price} />}
              >
                <img src={meal.image} />
              </CardMedia>
              <CardActions>
                <FlatButton label="Delete Meal" />
              </CardActions>
            </Card></li>;
            })
          }
          </ul>
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
