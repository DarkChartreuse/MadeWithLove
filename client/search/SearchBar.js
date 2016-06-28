import React from 'react';
import  axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Search from './Search';


class SearchBar extends React.Component {
  render() {
    console.log('coming from searchbar...', this.props.fetchOrders);
    return (
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <h1 className="header center">Made With Love</h1>
            <div className="row center">
              <h5 className="header col s12 light">Find your next meal</h5>
            </div>
            <div className="row center input-field">
              <div className="col s8 offset-s2">
              <input className="" type="text" placeholder="type here" onChange={inputCuisine} ></input>
              
              <input type='submit'
                className="btn-large waves-effect waves-light #ffb74d orange lighten-2 black-text menubuttons"
                onSubmit={fetchOrders}
              />
                Search
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;
// const mapStateToProps = (state) => {
//   return { cuisine: state.cuisine };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     inputCuisine: (e) => dispatch({ type: 'SAVE_SEARCH_QUERY', data: e.target.value }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Basicsearch);