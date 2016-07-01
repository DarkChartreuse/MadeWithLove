import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';

export default class Mealview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.loadMealOrder();
  }

  loadMealOrder() {
    axios.get(`/api${window.location.pathname}`)
      .then(function(response){
        console.log('res data', response);
      });  
  }

  render() {
  	

    return (
      <div>
        Halo
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