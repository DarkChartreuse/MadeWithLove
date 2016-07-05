import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router';
var Carousel = require('nuka-carousel');

export default class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: undefined,
    }
    this.handleResults = this.handleResults.bind(this);
  }

  handleResults(data) {
    this.setState({ results: data });
  }

  componentDidMount() {
    if(this.props.loginUser.first_name) {
    	axios.post('/api/getrecommendation', { user_id: this.props.loginUser.userID })
    	.then( results => {
        console.log('recommendations!: ', results.data);
        this.handleResults(results.data);
        console.log('transferred: ', this.state.results);
    	})
    }
  }

  render() {
  	return (
        <div className="container">
        <h3>Your Recommendations</h3>
        { this.state.results && 
  	    <Carousel slidesToShow={3} cellAlign="center" >
          { this.state.results.map((meal) => (
                <img src={meal._source.image} style={{width: '300'}}/>
               ))}
        </Carousel>
        }
        { !this.state.results && <div>want some recommendations? <Link to='/search'>click here</Link></div> }
      </div>
    )
  }
}
