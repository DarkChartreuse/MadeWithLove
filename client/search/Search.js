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

  constructor(props) {
    super(props);
    this.state = {
    	cuisine: ''
    }
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  _handleCuisine(e) {
    this.setState({cuisine: e.target.value});
    console.log(this.state);
  }

  _handleSubmit(e) {
  	var obj = {
  		cuisine: this.state.cuisine,
  	}

  	axios.post('/api/auth/sign-in', obj)
  	  .then( (response) => {
  	  	//pass the request to the server
  	  	//redirect to next view with the search results
  	  })
  	  .catch((error) => {
  	      console.log(error);
  	  });

  }

  render() {
    var orders = [
      {cuisine: 'Japanese', price: '$9.99', stocked: true, food: 'Sushi', chefId:'Miyazaki'},
      {cuisine: 'Japanese', price: '$14.99', stocked: true, food: 'Dango', chefId:'Asami'},
      {cuisine: 'Japanese', price: '$7.99', stocked: false, food: 'Ramen', chefId:'Chika'},
      {cuisine: 'Indian', price: '$9.99', stocked: true, food: 'Palak Paneer', chefId:'Raveena'},
      {cuisine: 'Indian', price: '$8.99', stocked: false, food: 'Chicken Tikka', chefId:'Balaji'},
      {cuisine: 'Indian', price: '$6.99', stocked: true, food: 'Balti Chicken', chefId:'Karishma'}
    ];    
    return <FilterableCuisineTable orders={orders} />;
  }
}

class FilterableCuisineTable extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   filterText: '', 
    //   inStockOnly: false
    // };
  }

  // _handleUserInput(filterText, inStockOnly) {
  //   this.setState({
  //     filterText:filterText,
  //     inStockOnly:inStockOnly
  //   });
  // } 

  render() {
    return (            
      <div>
        <SearchBar />
        <CuisineTable 
          orders={this.props.orders}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
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
          ref="filterTextInput"
        />
        <p>
          <input 
            type="checkbox" 
            class="checkbox"
          />
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
    this.props.orders.forEach((cuisine) => {
      if(cuisine.food.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!cuisine.stocked && this.props.inStockOnly)) { return; }   
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
        <td width="50%">{this.props.cuisine.chefId}</td>
        <td width="50%">{this.props.cuisine.price}</td>
        <td>
          <OrderButton 
            chef={this.props.cuisine.chefId}
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
      <tr><th colSpan="4" className="bg-success">{this.state.order.name.toUpperCase()}</th></tr>
    );
  }
}

class OrderButton extends React.Component {
  

  _handleSubmit() {
    
    let data = {
      chef: this.props.chefId,
      price: this.props.price,
      item: this.props.item  


