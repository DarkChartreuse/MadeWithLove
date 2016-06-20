import React from 'react';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var Cuisines = [
      {category: 'Japanese', price: '$49.99', stocked: true, name: 'Sushi'},
      {category: 'Japanese', price: '$9.99', stocked: true, name: 'Dango'},
      {category: 'Japanese', price: '$29.99', stocked: false, name: 'Ramen'},
      {category: 'Indian', price: '$99.99', stocked: true, name: 'Palak Paneer'},
      {category: 'Indian', price: '$399.99', stocked: false, name: 'Chicken Tikka'},
      {category: 'Indian', price: '$199.99', stocked: true, name: 'Balti Chicken'}
    ];    
    return <FilterableCuisineTable cuisines={Cuisines} />;
  }
}


