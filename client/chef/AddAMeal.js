import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class AddAMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_date: '',
      add_time: '',
      typeoffood: '',
      price: '',
      quantity: '',
    };
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleTypeOfFood = this.handleTypeOfFood.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDate(e) {
    this.setState({ add_date: e.target.value });
  }
  handleTime(e) {
    this.setState({ add_time: e.target.value });
  }
  handleTypeOfFood(e) {
    this.setState({ typeoffood: e.target.value });
  }
  handlePrice(e) {
    this.setState({ price: e.target.value });
  }
  handleQuantity(e) {
    this.setState({ quantity: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const mealObj = {
      isChef: this.props.isChef,
      chefID: this.props.userID,
      chefName: this.props.chefName,
      add_date: this.state.add_date,
      add_time: this.state.add_time,
      typeoffood: this.state.typeoffood,
      price: this.state.price,
      quantity: this.state.quantity,
    };
    axios.post('/api/meals/', mealObj)
      .then((response) => {
        console.log('the saved response', response);
        browserHistory.push('/');
      });
  }
  render() {
    return (
      <div className="container row">
        <div className="col s8 offset-s2">
          <h3>add a meal</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="date" name="add_date" onChange={this.handleDate} />
            <input type="time" name="add_time" onChange={this.handleTime} />
            <input type="text" placeholder="type of food" onChange={this.handleTypeOfFood} />
            <input type="text" placeholder="price" onChange={this.handlePrice} />
            <input type="text" placeholder="quantity" onChange={this.handleQuantity} />
            <button type="submit">Submit Meal</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
({
  userID: state.loginUser.userID,
  isChef: state.loginUser.isChef,
  chefName: state.loginUser.firstName,
});

AddAMeal.propTypes = {
  userID: React.PropTypes.number,
  isChef: React.PropTypes.bool,
  chefName: React.PropTypes.string,
};

export default connect(mapStateToProps, null)(AddAMeal);
