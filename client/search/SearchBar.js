import React from 'react';
import DatePicker from 'material-ui/DatePicker';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: undefined,
      add_date: null,
      minPrice: undefined,
      maxPrice: undefined,
    };
    this.handleDate = this.handleDate.bind(this);
    this.handleMinPrice = this.handleMinPrice.bind(this);
    this.handleMaxPrice = this.handleMaxPrice.bind(this);
    this.handleCuisine = this.handleCuisine.bind(this);
  }
  
  handleDate(event, date) {
    this.setState({ add_date: date });
  }
  handleCuisine(e) {
    this.setState({ cuisine: e.target.value });
  }
  handleMaxPrice(e) {
    this.setState({ maxPrice: e.target.value });
  }
  handleMinPrice(e) {
    this.setState({ minPrice: e.target.value });
  }

  render() {
    return (
      // <div id="index-banner" className="parallax-container">
      <div>
        <div className="emptybox">
        </div>
        <div className="container">
          <h1 className="header splash">Eat at home</h1>
          <div className="row">
            <h5 className="header col s12 splashsub">Home-cooked meals to your doorstep in San Francisco</h5>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="type of food" type="text" onChange={this.handleCuisine} />
            </div>
            <div className="input-field col s2">
              <input placeholder="min. price" type="text" name="minPrice" onChange={this.handleMinPrice} />
            </div>
            <div className="input-field col s2">
              <input placeholder="max. price" type="text" name="maxPrice" onChange={this.handleMaxPrice} />
            </div>
            <button
              className="btn-large black-text menubuttons"
              onClick={() => { this.props.fetchOrders({
                userID: this.props.loginUser.userID,
                cuisine: this.state.cuisine,
                maxPrice: this.state.maxPrice,
                minPrice: this.state.minPrice,
                add_date: this.state.add_date,
              }) }} >
              Search
            </button>
          </div>
        </div>
      </div>
      // </div>
    )
  }
}

export default SearchBar;


// <DatePicker
//   hintText="Pick a date" 
//   value={this.state.add_date}
//   onChange={this.handleDate} />