import React from 'react';
import  axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';


const Basicsearch = ({ cuisine, inputCuisine }) =>
  (<div id="index-banner" className="parallax-container">
    <div className="section no-pad-bot">
      <div className="container">
        <h1 className="header center">Made With Love</h1>
        <div className="row center">
          <h5 className="header col s12 light">Find your next meal</h5>
        </div>
        <div className="row center input-field">
          <div className="col s8 offset-s2">
          <input className="" type="text" placeholder="type here" onChange={inputCuisine} ></input>
          
          <Link
            to="/search"
            className="btn-large waves-effect waves-light #ffb74d orange lighten-2 black-text menubuttons"
          >
            Search
          </Link>
          </div>
        </div>
      </div>
    </div>
  </div>);


const mapStateToProps = (state) => {
  return { cuisine: state.cuisine };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputCuisine: (e) => dispatch({ type: 'SAVE_SEARCH_QUERY', data: e.target.value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basicsearch);

// class Basicsearch extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       cuisine: ''
//     }
//   }
  
//   _handleCuisine(e) {
//     this.setState({cuisine: e.target.value});
//     console.log(this.state);
//   }

//   _handleSubmit(e) {
//     var obj = {
//       cuisine: this.state.cuisine,
//     }
//     //passes along the search parameters to next view
//   }

//   render() {
//     return (
//       <div id="index-banner" className="parallax-container">
//         <div className="section no-pad-bot">
//           <div className="container">
//             <h1 className="header center teal-text text-lighten-2">Made With Love</h1>
//             <div className="row center">
//               <h5 className="header col s12 light">Find your next meal</h5>
//             </div>
//             <div className="row center">
//               <input placeholder='type here' onChange={this._handleCuisine.bind(this)} ></input>
//               <a id="download-button" onClick={this._handleSubmit.bind(this)} className="btn-large waves-effect waves-light #ffb74d orange lighten-2"><Link to="/search" >Search</Link></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
