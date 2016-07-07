import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchOrders, updateMeal } from '../actions';
import SearchBar from './SearchBar';
// import CuisineRow from './CuisineRow';
import Recommend from './Recommend';
import Grid from './Grid';


class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('searchprops >>>>>', this.props);
    var { isFetching, orders } = this.props;
    return (
      <div>
        <SearchBar loginUser={this.props.loginUser} fetchOrders={this.props.fetchOrders} vegan={this.props.vegan} toggleVegan={this.props.toggleVegan}/>
        { this.props.loginUser.first_name && <Recommend loginUser={this.props.loginUser} meal={this.props.updateMeal} /> }
        { !this.props.orders.orders && <div></div> }
        { this.props.orders.orders && <Grid orders={this.props.orders.orders} meal={this.props.updateMeal} loginUser={this.props.loginUser} /> }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleVegan: () => dispatch({type: 'TOGGLE_VEGAN'}),
    fetchOrders: (input) => dispatch(fetchOrders(input)),
    updateMeal: (result) => dispatch({ type: 'UPDATE_CURRENT_MEAL', data: result }),
  }
}

function mapStatetoProps(state) {
  return {
    cuisine: state.cuisine,
    isFetching: true,
    orders: state.orders,
    error: null,
    vegan: false,
    loginUser: state.loginUser,
  };
}

Search.propTypes = {
  inputCuisine: React.PropTypes.func,
  cuisine: React.PropTypes.string,
  // saveSearchQuery: React.PropTypes.object,
  fetchOrders: React.PropTypes.func,
  toggleVegan: React.PropTypes.func,
  updateMeal: React.PropTypes.func,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Search);

