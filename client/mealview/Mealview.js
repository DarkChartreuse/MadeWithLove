import React from 'react';
import  axios from 'axios';
import { connect } from 'react-redux';
import { fetchOrders } from '../actions'

const dummyReviews = [
  {'username': 'Andrew', 'comment': 'This was okay. Needed more chicken and pasta.', 'rating': 4},
  {'username': 'Alex', 'comment': 'I could have sworn I ordered katsu, but this was fine', 'rating': 3},
  {'username': 'Scrum-Kage Sama', 'comment': 'Peasant food', 'rating': 1},
  {'username': 'Dan', 'comment': 'Minus a star for the chef not looking like my mother', 'rating': 4},
];

class Orderbox extends React.Component {
  _updateQuantity(e) {
    this.setState({quantity: e.target.value});
  }

  render() {
    return (
      <div>Orderbox
        <div>date: {this.props.date}</div>
        <div>time block: {this.props.timeBlock}</div>
        <div>price: {this.props.price} x <input onChange={this._updateQuantity.bind(this)} placeholder='1'></input></div>
        <div>quantity: {this.props.quantity}</div>
        <div>delivery charge: {this.props.deliveryCharge}</div>
        <div>checkout total: {this.props.checkoutTotal}</div>
      </div>

    )
  }
}

export default class Mealview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	image: 'http://images.bigoven.com/image/upload/v1426276598/cajunchickenpasta-17.jpg',
    	chefName: 'Antonio Banderas',
    	chefDescription: 'I like to take long walks on the beach, play with my dogs, and I enjoy being around people who make me laugh haha',
    	reviews: dummyReviews,
    	rating: 3,
      date: 'June 22, 2016',
      timeBlock: '1:00PM - 2:00PM',
      price: 20,
      quantity: 1,
      checkoutTotal: 35
    }
  }

  componentDidMount() {
    this.props.fetchOrders();
  	//make query to server for meal and chef info of this.props.orderId
  	  // .then(function (response) {
  	  //   this.setState({
  	  //     image: response.image,
  	  //     chefName: response.chef,
  	  //     chefDescription: response.description,
  	  //     reviews: response.reviews,
  	  //     rating: response.rating,
  	  //   })
  	  // })
  	  // .catch((error) => {
  	  //     console.log(error);
  	  // });
  }

  render() {
  	var displayReviews = this.state.reviews.map( function(review){
  		return (
  			<ul>
  			  <li>{review.username}</li>
  			  <li>{review.comment}</li>
  			  <li>{review.rating}</li>
  			</ul>
  			);
  	  });

    return (
      <div>
        <div><img style={{width:'200px'}} src={this.state.image} /></div>
        <p>{this.state.chefName}</p>
        <p>{this.state.chefDescription}</p>
        <p>{this.state.rating}</p>
        <div>
          <div>Reviews</div>
          {displayReviews}
        </div>
        <Orderbox 
        date={this.state.date}
        timeBlock={this.state.timeBlock}
        price={this.state.price}
        quantity={this.state.quantity}
        deliveryCharge={this.state.deliveryCharge}
        checkoutTotal={this.state.checkoutTotal}
        />
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders())
  }
}

function mapStatetoProps(state) {
  return {
    isFetching: false,
    result: [],
    error: null
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Mealview);

