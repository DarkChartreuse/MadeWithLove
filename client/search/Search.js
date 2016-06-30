import React from 'react';
import  axios from 'axios';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchOrders } from '../actions'

export default class Search extends React.Component {
  render() {
    console.log('searchprops >>>>>', this.props);
    var { isFetching, orders } = this.props;
    return (
      <div>
        <SearchBar inputCuisine={this.props.inputCuisine} fetchOrders={this.props.fetchOrders} cuisine={this.props.saveSearchQuery.cuisine} vegan={this.props.vegan} toggleVegan={this.props.toggleVegan}/>
        { !this.props.orders.orders && <div></div> }
        { this.props.orders.orders && <FilterableCuisineTable orders={orders} /> }
      </div>
    )
  }
}

class FilterableCuisineTable extends React.Component {
  render() {
    const { orders, inputCuisine, cuisine } = this.props.orders;
    // console.log('filtertablecomponent...',this.props.fetchOrders);
    return (            
      <div>
        <CuisineTable 
          orders={orders}
        />
      </div>
    );
  }
}


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: undefined,
      add_date: undefined,
      minPrice: undefined,
      maxPrice: undefined
    };
    this.handleDate = this.handleDate.bind(this);
    this.handleMinPrice = this.handleMinPrice.bind(this);
    this.handleMaxPrice = this.handleMaxPrice.bind(this);
    this.handleCuisine = this.handleCuisine.bind(this);
  }
  
  handleDate(e) {
    this.setState({ add_date: e.target.value });
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
        <div className="section no-pad-bot">
          <div className="container">
            <h1 className="header center">Made With Love</h1>
            <div className="row center">
              <h5 className="header col s12 light">Find your next meal</h5>
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
                <input type="date" name="add_date" onChange={this.handleDate}/>
              </div>
              <button
                className="btn-large #ffb74d orange lighten-2 black-text menubuttons"
                onClick={() => { this.props.fetchOrders({
                  cuisine: this.state.cuisine,
                  maxPrice: this.state.maxPrice,
                  minPrice: this.state.minPrice,
                  add_date: this.state.add_date
                }) }} >
                Search
              </button>
            </div>
            <div className="row">
              <div>
                <input type="checkbox" id="test5" checked={this.props.vegan} />
                <label for="test5" onClick={ () => this.props.toggleVegan() }>Vegan</label>
              </div>
            </div>
          </div>
        </div>
      // </div>
    )
  }
}
// class SearchBar extends React.Component {
//   // _handleChange() {
//   //   let filterTextVal = this.refs.filterTextInput.value;
//   //   let inStockCheckBoxVal = this.refs.inStockOnlyInput.value;
//   //   this.props.onUserInput(filterTextVal , inStockCheckBoxVal);
//   // }

//   render() {
//     return (
//       <form>             
//         <input
//           className="form-control" 
//           type="text" 
//           placeholder="Search by cuisine name"
//           />
//         <p>
//           <input
//             type="checkbox" 
//             className="checkbox"/>
//           {' '}
//           Only show items in stock         
//         </p>
//       </form>
//     );
//   }
// }


class CuisineTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    if(this.props.orders !== undefined) {
      this.props.orders.forEach((cuisine) => {
        // if(cuisine.food.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!cuisine.stocked && this.props.inStockOnly)) { return; }   
        if(cuisine.cuisine !== lastCategory) {
          rows.push(
            <CuisineCategoryRow 
            category={cuisine.cuisine}
            key={cuisine.cuisine} />
          );
        }
        rows.push(<CuisineRow cuisine={cuisine} key={cuisine.food} />);
        lastCategory = cuisine.cuisine;
      });
    }

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
      this.props.cuisine.food : 
      <span style={{color: 'red'}}>
        {this.props.cuisine.food}
      </span>;
    return(
      <tr>
        <td width="50%"><Link to="/mealview" >{name}</Link></td>
        <td width="50%">{this.props.cuisine.chefName} </td>
        <td width="50%"><img src={this.props.cuisine.image}className="img-responsive" /></td>
        <td width="50%">{this.props.cuisine.price}</td>
        <td>
          <OrderButton 
            chef={this.props.cuisine.chefName}
            price={this.props.cuisine.price}
            item={this.props.cuisine.food}
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
      <tr><th colSpan="4" className="bg-success">{this.props.category}</th></tr>
    );
  }
}

class OrderButton extends React.Component {

  _handleSubmit() {
    
    let data = {
      chef: this.props.chefId,
      price: this.props.price,
      item: this.props.item
    }


    console.log(data);

    axios.post('/api/createorder', data)
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


const mapDispatchToProps = (dispatch) => {
  return {
    inputCuisine: (e) => dispatch({ type: 'SAVE_SEARCH_QUERY', data: e.target.value }),
    toggleVegan: () => dispatch({type: 'TOGGLE_VEGAN'}),
    fetchOrders: (input) => dispatch(fetchOrders(input))
  }
}

function mapStatetoProps(state) {
  return {
    cuisine: state.cuisine,
    isFetching: true,
    saveSearchQuery: state.saveSearchQuery,
    orders: state.orders,
    error: null,
    vegan: false
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Search);

