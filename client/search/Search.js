import React from 'react';
import  axios from 'axios';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchOrders } from '../actions'

//FilterableCuisineTable
  //SearchBar  
  //CuisineTable
    //CuisineCategoryRow
    //CuisineRow

 //our state is: value of checkbox, & user input in search box
 //components that render something based on that state: CuisineTable 
 //common owner: FilterableCuisineTable
export default class Search extends React.Component {
  
  componentDidMount() {
    console.log('search props...', this.props.saveSearchQuery.cuisine);
    this.props.fetchOrders(this.props.saveSearchQuery.cuisine);
  }

  _handleCuisine(e) {
    this.setState({cuisine: e.target.value});
    console.log(this.state);
  }

  render() {
    var { isFetching, orders, error} = this.props;   
    return (
      <div>
      { orders.isFetching && <h2>Loading...</h2>}
      { !orders.isFetching && <FilterableCuisineTable orders={orders} /> }
      </div>
    )
  }
}

class FilterableCuisineTable extends React.Component {
  // _handleUserInput(filterText, inStockOnly) {
  //   this.setState({
  //     filterText:filterText,
  //     inStockOnly:inStockOnly
  //   });
  // } 

  render() {
    const { orders } = this.props.orders;
    // console.log('filtertablecomponent...',this.props, orders);
    return (            
      <div>
        <SearchBar />
        <CuisineTable 
          orders={orders}
        />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  // _handleChange() {
  //   let filterTextVal = this.refs.filterTextInput.value;
  //   let inStockCheckBoxVal = this.refs.inStockOnlyInput.value;
  //   this.props.onUserInput(filterTextVal , inStockCheckBoxVal);
  // }

  render() {
    return (
      <form>             
        <input
          className="form-control" 
          type="text" 
          placeholder="Search by cuisine name"
          />
        <p>
          <input
            type="checkbox" 
            className="checkbox"/>
          {' '}
          Only show items in stock         
        </p>
      </form>
    );
  }
}


class CuisineTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    console.log('cuisinetableprops:...', this.props);
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
        rows.push(<CuisineRow cuisine={cuisine} key={cuisine.food} />);
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

class CuisineRow extends React.Component {
  render() {
    var name = this.props.cuisine.stocked ? 
      this.props.cuisine.food : 
      <span style={{color: 'red'}}>
        {this.props.cuisine.food}
      </span>;
    return(
      <tr>
        <td width="50%"><Link to="/mealview" >{name}</Link></td>
        <td width="50%">{this.props.cuisine.chefName}</td>
        <td width="50%">{this.props.cuisine.price}</td>
        <td>
          <OrderButton 
            chef={this.props.cuisine.chefName}
            price={this.props.cuisine.price}
            item={this.props.cuisine.food}
            isInStock={this.props.cuisine.stocked}
          />
        </td>  
      </tr>
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

class OrderButton extends React.Component {

  _handleSubmit() {
    
    let data = {
      chef: this.props.chefId,
      price: this.props.price,
      item: this.props.item
    }


    console.log(data);

    axios.post('/api/createOrder', data)
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


const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (input) => dispatch(fetchOrders(input))
  }
}

function mapStatetoProps(state) {
  return {
    isFetching: true,
    saveSearchQuery: state.saveSearchQuery,
    orders: state.orders,
    error: null
  };
}



export default connect(mapStatetoProps, mapDispatchToProps)(Search);
