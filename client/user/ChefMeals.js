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

  render() {
  	console.log('chefmeals this.props.orders.chefMeals: ', this.props.orders.chefMeals);
  	console.log('chefmeals this.props.orders.chefOrders: ', this.props.orders.chefOrders);
    const filteredOrders = [];
    if(this.props.orders.chefOrders !== undefined){
      for(var i=0; i<this.props.orders.chefOrders.length; i++) {
        if(this.props.orders.chefOrders[i].delivered === false) {
          filteredOrders.push(this.props.orders.chefOrders[i]);
        }
      }
    }
    console.log(filteredOrders);
    const viewChefOrders = this.props.viewChefOrders;
    const loginUser = this.props.loginUser;
  	return (
  	  <div className="container row center tablemode">
  	  {this.props.orders.chefMeals && <div>
        <h2>meals</h2>
  	  	<div className='col s5 themode'>
  	  	  
          <table>
            <thead>
              <tr>
                <th>Meal</th>
                <th></th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              { this.props.orders.chefMeals.map((meal) => (
                  <tr>
                    <th><img className="smallthumb z-depth-3" src={meal.image} /></th>
                    <th>{meal.food}</th>
                    <th>${meal.price}</th>
                  </tr>
                ))}
            </tbody>
          </table>
  	  	</div>
        </div>
  	  }
      <div className=' col s2 emptybox2'></div>
  	  {this.props.orders.chefOrders ?
        <div>
        <h2>orders</h2>
  	  	<div className='col s5 themode'>
  	  	  
  	  	  <table>
            <thead>
              <tr>
                <th>Meal</th>
                <th>Recipient</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
  	  	    {filteredOrders.map((order) => (
              <tr>
                <th><img className="smallthumb z-depth-3" src={order.image} /></th>
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
        </div> :
        <div className='col s5 themode ordermode'>
                  <h2>orders</h2>
                  <div>You have no orders</div>
                  <br />
                  <br />
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
