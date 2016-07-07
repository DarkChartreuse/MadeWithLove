import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMeal } from '../actions';
import { browserHistory } from 'react-router';

class Mealview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {},
      submitDisable: false,
      paymentError: null,
    };
    this.handleStripeSubmit = this.handleStripeSubmit.bind(this);
  }
  componentDidMount() {
    Stripe.setPublishableKey('pk_test_XEXhLE6bcWx5GBeDrsDkSvyy');
  }

  handleStripeSubmit(e) {
    const context = this;
    e.preventDefault();
    this.setState({ submitDisable: true, paymentError: null });

    Stripe.card.createToken(e.target, (status, res) => {
      console.log('the status', status);
      const mealObj = context.props.mealState;

      console.log('the respone stripe', res);
      res.amount = context.props.mealState.price;
      res.food = context.props.mealState.food;
      res.chefId = context.props.mealState.chefId;
      axios.post('/api/payments', res)
        .then((response) => {
          console.log(response.data.message);
        })
          .then(() => { axios.post('/api/createorder', mealObj) })
          .then((response) => {
            console.log('we saved the order yo!', response);
            browserHistory.push('/orderstatus');
          });
    });
  }

  render() {
    return (
        <div className="container row center">
          <h3>{this.props.mealState.food}</h3>
          <div className="col s6 offset-3 themode mealviewform">
            <p className="boldsubtitle">Your meal information</p>
            <ul>
              <li>food: {this.props.mealState.food} </li>
              <li>price: {this.props.mealState.price} </li>
              <li>quantity: {this.props.mealState.quantity} </li>
              <li>chef: {this.props.mealState.chef_name}</li>
              <li>phone: {this.props.mealState.chef_phone} </li>
              
            </ul>
            <p className="boldsubtitle">Delivered to: </p>
          
          
            <ul>
              <li>{this.props.mealState.user_name} </li>
              <li>{this.props.mealState.user_address} </li>
              <li>{this.props.mealState.user_phone} </li>
            </ul>
            checkoutTotal: {`$${this.props.mealState.quantity * this.props.mealState.price}`}
          </div>
          <div className="themode paymode">
            <form onSubmit={this.handleStripeSubmit} >
              <p>Please enter your credit card info.</p>
              <input type="text" data-stripe="number" placeholder="credit card number" /><br />
              <input type="text" data-stripe="exp-month" placeholder="expiration month" /><br />
              <input type="text" data-stripe="exp-year" placeholder="expiration year" /><br />
              <input type="text" data-stripe="cvc" placeholder="cvc" /><br />
              <input className="btn menubuttons" disabled={this.state.submitDisabled} type="submit" value="Purchase" />
            </form>
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({ mealState }) => ({ mealState });

const mapDispatchToProps = (dispatch) => {
  return {
    updateMeal: (response) => dispatch(updateMeal(response)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mealview);

// var displayReviews = this.state.reviews.map( function(review){
//   return (
//     <ul>
//       <li>{review.username}</li>
//       <li>{review.comment}</li>
//       <li>{review.rating}</li>
//     </ul>
//     );
//   });


// <div><img style={{width:'200px'}} src={this.state.image} /></div>
// <p>{this.state.chef_name}</p>
// <p>{this.state.chefDescription}</p>
// <p>{this.state.rating}</p>
// <div>
//   <div>Reviews</div>
//   {displayReviews}
// </div>
// <Orderbox 
// date={this.state.date}
// timeBlock={this.state.timeBlock}
// price={this.state.price}
// quantity={this.state.quantity}
// deliveryCharge={this.state.deliveryCharge}
// checkoutTotal={this.state.checkoutTotal}
// />

// <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_8kQux35EriTK7xxw2Bvhcuz0PXwpP0rw&scope=read_write">connect to stripe</a>
