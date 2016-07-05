import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMeal } from '../actions';

class Mealview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {},
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisable: false,
      paymentError: null,
      paymentSuccess: false,
      token: null,
    };
    this.handleStripeSubmit = this.handleStripeSubmit.bind(this);
  }

  componentWillMount() {
    this.loadMealOrder();
  }

  componentDidMount() {
    Stripe.setPublishableKey('pk_test_XEXhLE6bcWx5GBeDrsDkSvyy');
  }
  

  getScriptURL() {
    return 'https://js.stripe.com/v2/';
  }

  loadMealOrder() {
    console.log('poooooop');
    
    // axios.get(`/api${window.location.pathname}`)
    //   .then(response => {
    //     console.log('res data', response);
    //     context.props.updateMeal(response.data);
    //     context.setState({ meal: response.data });
    //     console.log('the meal props', this.state.meal);
    //   });
  }

  // handleConnect(e) {
  //   const context = this;
  //   e.preventDefault();
  //   axios.get('/authorize')
  //     .then((response) => {
  //       console.log('the handleconnect response', response);
  //     });
  // }


  handleStripeSubmit(e) {
    const context = this;
    e.preventDefault();
    this.setState({ submitDisable: true, paymentError: null });

    Stripe.card.createToken(e.target, (status, res) => {
      console.log('the status', status);
      const mealObj = context.props.mealState;

      console.log('the respone stripe', res);
      res.amount = context.props.mealState.price;
      res.chefId = context.props.mealState.chefId;
      axios.post('/api/payments', res)
        .then((response) => {
          console.log('what is the purchase response', response);
        });
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <h3>{this.props.mealState.food}</h3>
            <ul>
              <li>chef: {this.props.mealState.chefName}</li>
              <li>phone: {this.props.mealState.chefPhone} </li>
              <li>price: {this.props.mealState.price} </li>
              <li>quantity: {this.props.mealState.quantity} </li>
            </ul>
          </div>
          <div>
            <p>Delivered to: </p>
          </div>
          <div>
            <ul>
              <li>{this.props.mealState.userName} </li>
              <li>{this.props.mealState.userAddress} </li>
              <li>{this.props.mealState.userPhone} </li>
            </ul>
          </div>
          <div>
          checkoutTotal: {`$${this.props.mealState.quantity * this.props.mealState.price}`}
          <div>
          
          </div>
          </div>
          <div>
          {!!this.state.stripeLoading ? <div>Loading</div> : this.state.stripeLoadingError}
          {!!this.state.stripeLoadingError ? <div>Error</div> : <div>Loaded!</div>}
          {!!this.state.paymentSuccess ? <div>Payment Complete!</div> : <div>Not completed</div>}
            <form onSubmit={this.handleStripeSubmit} >
              <span>{ this.state.paymentError }</span><br />
              <input type='text' data-stripe='number' placeholder='credit card number' /><br />
              <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
              <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
              <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
              <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
            </form>
          </div>
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
// <p>{this.state.chefName}</p>
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
