import React from 'react';
import  axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AddAMeal from './AddAMeal';

class ChefDashboard extends React.Component {
  render() {
    return (
      <div>
        <AddAMeal />
      </div>
      );
  }
}

// const mapDispatchToProps = (dispatch) => {

// }

// function mapStatetoProps(state) {
//   return {
//     isFetching: false,
//     result: [],
//     error: null,
//   };
// }

// export default connect(mapStatetoProps, mapDispatchToProps)(ChefDashboard);

export default ChefDashboard;
