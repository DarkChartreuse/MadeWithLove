import React from 'react';
import { viewChefMeals, viewChefOrders } from '../actions';
import { connect } from 'react-redux';
import DeliveredButton from './DeliveredButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

export default class ChefMeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    }
  }
  
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
    const viewChefOrders = this.props.viewChefOrders;
    const loginUser = this.props.loginUser;
  	return (
  	  <div>
  	  {this.props.orders.chefMeals &&
  	  	<div>
  	  	  <h3>Your Meals</h3>
          <table>
            <thead>
              <tr>
                <th>Meal ID</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              { this.props.orders.chefMeals.map((meal) => (
                  <tr>
                    <th>{meal.mealId}</th>
                    <th>{meal.food}</th>
                    <th>{meal.price}</th>
                  </tr>
                ))}
            </tbody>
          </table>
  	  	</div>
  	  }
  	  {this.props.orders.chefOrders &&
  	  	<div>
  	  	  <h3>Your Orders</h3>
  	  	  <table>
            <thead>
              <tr>
                <th>Meal</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
  	  	    {this.props.orders.chefOrders.map((order) => (
              <tr>
                <th>{order.food}</th>
                <th>{order.user_name}</th>
                <th>
                  <DeliveredButton 
                    order={order} 
                    viewChefOrders={viewChefOrders} 
                    loginUser={loginUser}
                    />
                </th>
              </tr>
  	  	    ))}
            </tbody>
          </table>
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
