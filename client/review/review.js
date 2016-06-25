import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Review extends React.Component {
  constructor() {
      super();

      this.state = {
          rating: 1
      };
  }

  onStarClick(name, value) {
      this.setState({rating: value});
  }

  render() {
      const { rating } = this.state;
      return (                
          <div>
              <h2>Rating from state: {rating}</h2>
              <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
              />
          </div>
      );
  }
}


