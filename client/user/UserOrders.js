import React from 'react';
import { viewUserOrders } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';


export default class UserOrders extends React.Component {
  
  componentDidMount() {
  	if(!this.props.loginUser.isChef) {
	    this.props.viewUserOrders(this.props.loginUser.userID);
  	}

  }

  render() {
  	console.log('usermeals this.props.orders.userOrders: ', this.props.orders.userOrders);
    const filteredOrders = [];
    if(this.props.orders.userOrders !== undefined){
      for(var i=0; i<this.props.orders.userOrders.length; i++) {
        if(this.props.orders.userOrders[i].delivered === false) {
          filteredOrders.push(this.props.orders.userOrders[i]);
        }
      }
    }
    console.log('the filteredOrders', filteredOrders);
  	return (
      <div>
  	  { (!this.props.loginUser.first_name) ? 
        <h4>Please <Link to='signin'>log in</Link> to view your orders</h4> :
        <div className="container center">
          { this.props.orders.userOrders !== undefined && 
            <div className="themode ordermode">
              <h2>orders</h2>
              <table>
                <thead>
                  <tr>
                    
                    <th>Meal</th>
                    <th></th>
                    <th>Chef Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                      <tr>
                        <th><img className="smallthumb" src={order.image} /></th>
                        <th>{order.food}</th>
                        <th>{order.chef_name}</th>
                        <th>${order.price}</th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      }
      </div>
  	)
  }
}

const mapStateToProps = ({ loginUser, orders }) => ({ loginUser, orders });

const mapDispatchToProps = (dispatch) => {
  return {
    viewUserOrders: (userID) => dispatch(viewUserOrders(userID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);