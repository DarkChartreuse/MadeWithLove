import React from 'react';
//FilterableCuisineTable
  //SearchBar
  //CuisineTable
    //CuisineCategoryRow
    //CuisineRow

module.exports = class Search extends React.Component {

  constructor(props) {
    super(props);
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
  render() {
    return (            
      <div>
        <SearchBar />
        <CuisineTable cuisines={this.props.cuisines}/>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>             
        <input type="text" placeholder="Search by cuisine name"/>
        <p>
          <input type="checkbox" />
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Chef</th>
            <th>Price</th>
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
        <td>{name}</td>
        <td>{this.props.cuisine.chef}</td>
        <td>{this.props.cuisine.price}</td>
        <td><OrderButton /></td>
      </tr>
    ); 
  }
}

class CuisineCategoryRow extends React.Component {
  render() {
    return (
      <tr><th colSpan="2">{this.props.category}</th></tr>
    );
  }
}

class OrderButton extends React.Component {
  render() {
    return (
      <button className="submit-button btn-primary" onClick={console.log('ordered')}>Order</button>
    );
  }
}

