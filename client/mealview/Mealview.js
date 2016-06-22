import React from 'react';


const dummyReviews = [
  {'username': 'Andrew', 'comment': 'This was okay. Needed more chicken and pasta.', 'rating': 4},
  {'username': 'Alex', 'comment': 'I could have sworn I ordered katsu, but this was fine', 'rating': 3},
  {'username': 'Scrum-Kage Sama', 'comment': 'Peasant food', 'rating': 1},
  {'username': 'Dan', 'comment': 'Minus a star for the chef not looking like my mother', 'rating': 4},
];

export default class Mealview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	image: 'http://images.bigoven.com/image/upload/v1426276598/cajunchickenpasta-17.jpg',
    	chefName: 'Antonio Banderas',
    	chefDescription: 'I like to take long walks on the beach, play with my dogs, and I enjoy being around people who make me laugh haha',
    	reviews: dummyReviews,
    	rating: 3,
    	//checkout data
    	timeBlock: '',
    	date: '',
    	price: '',
    	checkoutTotal: '',
    	deliveryCharge: '',
    	quantity: ''
    }
  }

  didComponentMount(){
  	//make query to db for meal info of this.props.mealId
  	'/api/orders/:id'
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
      <div className='container'>
        <div><img style={{width:'200px'}} src={this.state.image} /></div>
        <p>{this.state.chefName}</p>
        <p>{this.state.chefDescription}</p>
        <p>{this.state.rating}</p>
        <div>
          <div>Reviews</div>
          {displayReviews}
        </div>
      </div>
    );
  }

}