import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router';
var Carousel = require('nuka-carousel');
import {GridTile} from 'material-ui/GridList';
import OrderButton from './OrderButton';

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
        <div className='container'>
        <h4>Top Picks for {this.props.loginUser.first_name}</h4>
        { this.state.results && 
  	    <Carousel slidesToShow={3} slideWidth={1} wrapAround={true}>
          { this.state.results.map((meal) => (
                <GridTile
                  key={meal._source.image}
                  title={meal._source.food}
                  subtitle={<span>by <b>{meal._source.chef}</b></span>}
                  actionIcon={ <OrderButton cuisine={meal._source} /> }
                >
                <img src={meal._source.image} style={{width: '100%', height: '250px', margin: '0 auto'}}/>
                </GridTile>
               ))}
        </Carousel>
        }
        { !this.state.results && <div>want some recommendations? <Link to='/search'>click here</Link></div> }
      </div>
    )
  }
}
