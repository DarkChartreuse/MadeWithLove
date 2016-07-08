import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import DatePicker from 'material-ui/DatePicker';
// import TimePicker from 'material-ui/TimePicker';

import ImageUploader from './ImageUploader';

const indexName = 'mwl';

class AddAMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_date: null,
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

  handleDate(event, date) {
    this.setState({ add_date: date });
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
      // isChef: this.props.isChef,
      // chefID: this.props.userID,
      // chef_address: this.props.chef_address,
      // chef_phone: this.props.chef_phone,
      // chef_name: this.props.chef_name,
      // chef_email: this.props.chef_email,
      // add_date: this.state.add_date,
      // add_time: this.state.add_time,
      // typeoffood: this.state.typeoffood,
      // cuisinetype: this.state.cuisinetype,
      // price: this.state.price,
      // quantity: this.state.quantity,
      // image: this.state.image,

      // index: indexName,
      // type: 'meal',
      // properties: {
        isChef: this.props.isChef,
        chefId: this.props.userID,
        chef_address: this.props.chef_address,
        chef_phone: this.props.chef_phone,
        chef_name: this.props.chef_name,
        chef_email: this.props.chef_email,
        add_date: this.state.add_date,
        add_time: this.state.add_time,
        food: this.state.typeoffood,
        cuisine: this.state.cuisinetype,
        price: this.state.price,
        quantity: this.state.quantity,
        image: this.state.image,
      // },
    };

    const axiosInstance = axios.create({
      baseURL: 'https://search-elasticmwl-xterfj3nmjftzwol6co6uwucoi.us-east-1.es.amazonaws.com',
    });
    // axios.post('/api/meals/', mealObj)
    axiosInstance.post('/mwl/meal', mealObj)
      .then((response) => {
        console.log('the saved response', response);
        browserHistory.push('/chefstatus');
      })
      .catch((err) => {
        this.handleError(err);
        browserHistory.push('/signin');
      });

    this.props.handleClose();
  }

  render() {
    return (
      <div className="container row center">
      <h3>add a meal</h3>
      <div className="themode addmealmode">
      <p>Please connect your account with Stripe to receive payments first.</p>
       <a href="/authorize" className="stripe-connect light-blue dark"><span>Connect with Stripe</span></a>
       <br />
       <br />


          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="dish name" onChange={this.handleTypeOfFood} />
            <input type="text" placeholder="cuisine type" onChange={this.handleCuisineType} />
            <input type="text" placeholder="price" onChange={this.handlePrice} />
            <input type="text" placeholder="quantity" onChange={this.handleQuantity} />

            <button className="btn menubuttons" type="submit">Submit Meal</button>
            <ImageUploader handleImage={this.handleImage} />
            <br/>
            <button className="btn black-text menubuttons" type="submit">Add Meal</button>
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
  chef_name: `${state.loginUser.first_name} ${state.loginUser.last_name}`,
  chef_address: state.loginUser.address,
  chef_phone: state.loginUser.phone,
  chef_email: state.loginUser.email,
});

AddAMeal.propTypes = {
  userID: React.PropTypes.number,
  isChef: React.PropTypes.bool,
  chef_name: React.PropTypes.string,
  chef_address: React.PropTypes.string,
  chef_phone: React.PropTypes.string,
  chef_email: React.PropTypes.string,
};

export default connect(mapStateToProps, null)(AddAMeal);

// <DatePicker
//   hintText="pickup date"
//   value={this.state.add_date}
//   onChange={this.handleDate} />
// <TimePicker
//   format="ampm"
//   hintText="pickup time"
//   value={this.state.add_time}
//   onChange={this.handleTime} />
