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
          <h1 className="header splash">eat at home</h1>
          <div className="row center">
            <h5 className="header col s12 light">Home-cooked meals to your doorsteps in San Francisco</h5>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input placeholder="Type of food" type="text" onChange={this.handleCuisine} />
            </div>
            <div className="input-field col s3">
              <input placeholder='Minimum Price'type="text" name="minPrice" onChange={this.handleMinPrice}/>
            </div>
            <div className="input-field col s3">
              <input placeholder='Maximum Price'type="text" name="maxPrice" onChange={this.handleMaxPrice}/>
            </div>
            <div className="input-field col s3">
              <DatePicker
                hintText="Pick a date" 
                value={this.state.add_date}
                onChange={this.handleDate} />
            </div>
            <button
              className="btn-large #ffb74d orange lighten-2 black-text menubuttons"
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
