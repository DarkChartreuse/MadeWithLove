import React from 'react';
import { Link } from 'react-router';
import OrderButton from './OrderButton';

export default class CuisineRow extends React.Component {
  render() {
    var name = this.props.cuisine.stocked ? 
      this.props.cuisine.food : 
      <span style={{color: 'red'}}>
        {this.props.cuisine.food}
      </span>;
    return(
      <tr>
        <td width="50%"><Link to="/mealview/:id" >{name}</Link></td>
        <td width="50%">{this.props.cuisine.chefName} </td>
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