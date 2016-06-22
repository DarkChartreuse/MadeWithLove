import React from 'react';
import  axios from 'axios';
import { Link } from 'react-router'

//FilterableCuisineTable
  //SearchBar  
  //CuisineTable
    //CuisineCategoryRow
    //CuisineRow

 //our state is: value of checkbox, & user input in search box
 //components that render something based on that state: CuisineTable 
 //common owner: FilterableCuisineTable
module.exports = class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	cuisine: ''
    }
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
    var Cuisines = [
      {category: 'Japanese', price: '$9.99', stocked: true, name: 'Sushi', chef:'Miyazaki'},
      {category: 'Japanese', price: '$14.99', stocked: true, name: 'Dango', chef:'Asami'},
      {category: 'Japanese', price: '$7.99', stocked: false, name: 'Ramen', chef:'Chika'},
      {category: 'Indian', price: '$9.99', stocked: true, name: 'Palak Paneer', chef:'Raveena'},
      {category: 'Indian', price: '$8.99', stocked: false, name: 'Chicken Tikka', chef:'Balaji'},
      {category: 'Indian', price: '$6.99', stocked: true, name: 'Balti Chicken', chef:'Karishma'}
    ];    
    return <FilterableCuisineTable cuisines={Cuisines} />;
  }
}

class FilterableCuisineTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '', 
      inStockOnly: false
    };
  }

  _handleUserInput(filterText, inStockOnly) {
    this.setState({
      filterText:filterText,
      inStockOnly:inStockOnly
    });
  } 

  render() {
    return (            
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this._handleUserInput.bind(this)}
        />
        <CuisineTable 
          cuisines={this.props.cuisines}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  _handleChange() {
    let filterTextVal = this.refs.filterTextInput.value;
    let inStockCheckBoxVal = this.refs.inStockOnlyInput.value;
    this.props.onUserInput(filterTextVal , inStockCheckBoxVal);
  }

  render() {
    return (
      <form>             
        <input
          className="form-control" 
          type="text" 
          placeholder="Search by cuisine name"
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this._handleChange.bind(this)}
        />
        <p>
          <input 
            type="checkbox" 
            class="checkbox"
            value={this.props.inStockOnly}
            ref="inStockOnlyInput" 
            onChange={this._handleChange.bind(this)}
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
    this.props.cuisines.forEach((cuisine) => {
      if(cuisine.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!cuisine.stocked && this.props.inStockOnly)) { return; }   
      if(cuisine.category !== lastCategory) {
        rows.push(
          <CuisineCategoryRow 
          category={cuisine.category}
          key={cuisine.category} />
        );
      }
      rows.push(<CuisineRow cuisine={cuisine} key={cuisine.name} />);
      lastCategory = cuisine.category;
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
      this.props.cuisine.name : 
      <span style={{color: 'red'}}>
        {this.props.cuisine.name}
      </span>;
    return(
      <tr>
        <td width="50%"><Link to="/mealview" >{name}</Link></td>
        <td width="50%">{this.props.cuisine.chef}</td>
        <td width="50%">{this.props.cuisine.price}</td>
        <td>
          <OrderButton 
            chef={this.props.cuisine.chef}
            price={this.props.cuisine.price}
            item={this.props.cuisine.name}
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
      <tr><th colSpan="4" className="bg-success">{this.props.category.toUpperCase()}</th></tr>
    );
  }
}

class OrderButton extends React.Component {
  

  _handleSubmit() {
    
    let data = {
      chef: this.props.chef,
      price: this.props.price,
      item: this.props.item  
    }

    console.log(data);

    axios.post('/api/orders', data)
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
