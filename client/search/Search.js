import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchOrders, updateMeal } from '../actions';
import SearchBar from './SearchBar';
import CuisineRow from './CuisineRow';

export default class Search extends React.Component {
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



// class SearchBar extends React.Component {
//   // _handleChange() {
//   //   let filterTextVal = this.refs.filterTextInput.value;
//   //   let inStockCheckBoxVal = this.refs.inStockOnlyInput.value;
//   //   this.props.onUserInput(filterTextVal , inStockCheckBoxVal);
//   // }

//   render() {
//     return (
//       <form>             
//         <input
//           className="form-control" 
//           type="text" 
//           placeholder="Search by cuisine name"
//           />
//         <p>
//           <input
//             type="checkbox" 
//             className="checkbox"/>
//           {' '}
//           Only show items in stock         
//         </p>
//       </form>
//     );
//   }
// }

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



<<<<<<< HEAD
    console.log(data);

    axios.post('/api/createorder', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });    
  }

  render() {
    let btn = "";
     if(this.props.isInStock) {
        btn = (
             <button className="submit-button btn-primary btn-xs active" onClick={this._handleSubmit.bind(this)}>Order</button>
        );
      } else {
        btn = (
             <button className="submit-button btn-primary btn-xs disabled" onClick={this._handleSubmit.bind(this)}>Order</button>
        );
      } 
    return btn;
  }
}  

=======
>>>>>>> Meal Order Flow WIP

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

