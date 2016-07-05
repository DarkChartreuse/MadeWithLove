import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ImageUploader from './ImageUploader';

class AddAMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_date: '',
      add_time: '',
      typeoffood: '',
      cuisinetype: '',
      price: '',
      quantity: '',
      image: '',
    };
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleTypeOfFood = this.handleTypeOfFood.bind(this);
    this.handleCuisineType = this.handleCuisineType.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
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

  handleCuisineType(e) {
    this.setState({ cuisinetype: e.target.value });
  }
  handlePrice(e) {
    this.setState({ price: e.target.value });
  }
  handleQuantity(e) {
    this.setState({ quantity: e.target.value });
  }
  handleImage(uri) {
    console.log('handleimage>>>', uri);
    this.setState({ image: uri });
  }

  handleError(error) {
    Materialize.toast(`${error.data.message}`, 4000);
  }
  handleSubmit(e) {
    e.preventDefault();
    const mealObj = {
      isChef: this.props.isChef,
      chefID: this.props.userID,
      chefAddress: this.props.chefAddress,
      chefPhone: this.props.chefPhone,
      chefName: this.props.chefName,
      chefEmail: this.props.chefEmail,
      add_date: this.state.add_date,
      add_time: this.state.add_time,
      typeoffood: this.state.typeoffood,
      cuisinetype: this.state.cuisinetype,
      price: this.state.price,
      quantity: this.state.quantity,
      image: this.state.image,
    };
    axios.post('/api/meals/', mealObj)
      .then((response) => {
        console.log('the saved response', response);
        browserHistory.push('/chefstatus');
      })
      .catch((err) => {
        this.handleError(err);
        browserHistory.push('/signin');
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
            <input type="text" placeholder="dish" onChange={this.handleTypeOfFood} />
            <input type="text" placeholder="type of cuisine" onChange={this.handleCuisineType} />
            <input type="text" placeholder="price" onChange={this.handlePrice} />
            <input type="text" placeholder="quantity" onChange={this.handleQuantity} />
            <a href="/authorize">CONNECT STRIPE</a>
            <button type="submit">Submit Meal</button>
          </form>
            <ImageUploader handleImage={this.handleImage} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
({
  userID: state.loginUser.userID,
  isChef: state.loginUser.isChef,
  chefName: `${state.loginUser.firstName} ${state.loginUser.lastName}`,
  chefAddress: state.loginUser.address,
  chefPhone: state.loginUser.phone,
  chefEmail: state.loginUser.email,
});

AddAMeal.propTypes = {
  userID: React.PropTypes.number,
  isChef: React.PropTypes.bool,
  chefName: React.PropTypes.string,
  chefAddress: React.PropTypes.string,
  chefPhone: React.PropTypes.string,
  chefEmail: React.PropTypes.string,
};

export default connect(mapStateToProps, null)(AddAMeal);
