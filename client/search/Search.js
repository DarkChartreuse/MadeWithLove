import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchOrders, updateMeal } from '../actions';
import SearchBar from './SearchBar';
import CuisineRow from './CuisineRow';

class Search extends React.Component {
  render() {
    console.log('searchprops >>>>>', this.props);
    var { isFetching, orders } = this.props;
    return (
      <div>
        <SearchBar  inputCuisine={this.props.inputCuisine} fetchOrders={this.props.fetchOrders} cuisine={this.props.saveSearchQuery.cuisine} vegan={this.props.vegan} toggleVegan={this.props.toggleVegan}/>
        { !this.props.orders.orders && <div></div> }
        { this.props.orders.orders && <FilterableCuisineTable orders={orders} meal={this.props.updateMeal} loginUser={this.props.loginUser} /> }
      </div>
    )
  }
}

class FilterableCuisineTable extends React.Component {
  render() {
    const { orders, inputCuisine, cuisine } = this.props.orders;
    
    // console.log('filtertablecomponent...',this.props.fetchOrders);
    return (            
      <div>
        <CuisineTable
          orders={orders} meal={this.props.meal} loginUser={this.props.loginUser}
        />
      </div>
    );
  }
}



class CuisineTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    if(this.props.orders !== undefined) {
      this.props.orders.forEach((cuisine) => {
        // if(cuisine.food.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!cuisine.stocked && this.props.inStockOnly)) { return; }   
        if(cuisine.cuisine !== lastCategory) {
          rows.push(
            <CuisineCategoryRow 
            category={cuisine.cuisine}
            key={cuisine.cuisine} />
          );
        }
        rows.push(<CuisineRow loginUser={this.props.loginUser} meal={this.props.meal} cuisine={cuisine} key={cuisine.food} />);
        lastCategory = cuisine.cuisine;
      });
    }

    return (
      <table className="table table-striped panel panel-primary">
        <thead className="panel-heading">
          <tr>
            <th scope="row" >Name</th>
            <th scope="row" >Chef</th>
            <th scope="row" >Price</th>
            <th scope="row" ></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}



class CuisineCategoryRow extends React.Component {
  render() {
    return (
      <tr><th colSpan="4" className="bg-success">{this.props.category}</th></tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputCuisine: (e) => dispatch({ type: 'SAVE_SEARCH_QUERY', data: e.target.value }),
    toggleVegan: () => dispatch({type: 'TOGGLE_VEGAN'}),
    fetchOrders: (input) => dispatch(fetchOrders(input)),
    updateMeal: (result) => dispatch({ type: 'UPDATE_CURRENT_MEAL', data: result }),
  }
}

function mapStatetoProps(state) {
  return {
    cuisine: state.cuisine,
    isFetching: true,
    saveSearchQuery: state.saveSearchQuery,
    orders: state.orders,
    error: null,
    vegan: false,
    loginUser: state.loginUser,
  };
}

Search.propTypes = {
  inputCuisine: React.PropTypes.func,
  cuisine: React.PropTypes.string,
  saveSearchQuery: React.PropTypes.object,
  fetchOrders: React.PropTypes.func,
  toggleVegan: React.PropTypes.func,
  updateMeal: React.PropTypes.func,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Search);

