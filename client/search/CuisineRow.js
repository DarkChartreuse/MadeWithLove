import React from 'react';
import { Link } from 'react-router';
import OrderButton from './OrderButton';

export default class CuisineRow extends React.Component {
  render() {

    return(
      <tr>
        <td width="50%">
        <Link to="/mealview/:id" >{this.props.cuisine.stocked ? this.props.cuisine.food : this.props.cuisine.food
      }</Link></td>
        <td width="50%">{this.props.cuisine.chef_name} </td>
        <td width="50%"><img src={this.props.cuisine.image}className="img-responsive" /></td>
        <td width="50%">{this.props.cuisine.price}</td>
        <td>
          <OrderButton
            meal={this.props.meal}
            cuisine={this.props.cuisine}

          />
        </td>  
      </tr>
    ); 
  }
}