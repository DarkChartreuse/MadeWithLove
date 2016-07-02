import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMeal } from '../actions';

class Mealview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {},
    };
  }

  componentWillMount() {
    this.loadMealOrder();
  }

  loadMealOrder() {
    console.log('poooooop');
    const context = this;
    axios.get(`/api${window.location.pathname}`)
      .then(response => {
        console.log('res data', response);
        context.props.updateMeal(response.data);
        context.setState({ meal: response.data });
        console.log('the meal props', this.state.meal);
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
          <h3>{this.state.meal.food}</h3>
            <ul>
              <li>chef: {this.state.meal.chefName}</li>
              <li>phone: {this.state.meal.chefPhone} </li>
              <li>price: {this.state.meal.price} </li>
              <li>quantity: {this.state.meal.quantity} </li>
            </ul>
          </div>
          <div>
          <p>Delivered to: </p>
          </div>
          <div>
            <ul>
              <li>{this.state.meal.userName} </li>
              <li>{this.state.meal.userAddress} </li>
              <li>{this.state.meal.userPhone} </li>
            </ul>
          </div>
          <div>
          checkoutTotal: {`$${this.state.meal.quantity * this.state.meal.price}`}
          </div>
      </div>
    </div>
    );
  }
}

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

const mapStateToProps = ({ mealState }) => ({ mealState });

const mapDispatchToProps = (dispatch) => {
  return {
    updateMeal: (response) => dispatch(updateMeal(response)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mealview);

