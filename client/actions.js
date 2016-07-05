const elasticClient = require('../server/instantiateES.js');

import {
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,
} from './constants';

import axios from 'axios';


export function fetchRequest() {
  return {
    type: FETCH_REQUEST,
    isFetching: true,
  };
}

export function fetchSuccess(result) {
  return {
    type: FETCH_SUCCESS,
    isFetching: false,
    success: true,
    result,
  };
}

// takes in error message from postedTweetFailure
export function fetchFailure(message) {
  return {
    type: FETCH_FAILURE,
    isFetching: false,
    success: false,
    message: Materialize.toast(message, 4000, 'rounded'),
  };
}

export function chefMealsSuccess(result) {
  return {
    type: 'CHEF_MEALS_SUCCESS',
    result,
  };
}

export function chefOrdersSuccess(result) {
  return {
    type: 'CHEF_ORDERS_SUCCESS',
    result,
  };
}

export function userOrdersSuccess(result) {
  return {
    type: 'USER_ORDERS_SUCCESS',
    result,
  };
}

export function viewChefOrders(chefId) {
  return dispatch => {
    axios.post('/api/getcheforders', {chefId: chefId})
    .then( results => {
      console.log('results!!>>>>>>>>> ', results.data);
      if(results.data.length) {
        dispatch(chefOrdersSuccess(results.data));
      } else {
        dispatch(fetchFailure('cannot find chef orders'));
      }
    })
  }
}

export function viewUserOrders(userId) {
  return dispatch => {
    axios.post('/api/getuserorders', {userId: userId})
    .then( results => {
      console.log('results!!>>>>>>>>> ', results.data);
      if(results.data.length) {
        dispatch(userOrdersSuccess(results.data));
      } else {
        dispatch(fetchFailure('cannot find users orders'));
      }
    })
  }
}

export function viewChefMeals(chefId) {
  console.log('chefIdforQUERY: ', chefId);
  console.log('..............Client.search')
  return dispatch => { elasticClient.search({
    index: 'mwl',
    type: 'meal',
    size: 50,
    "_source": ["food", "chefId", "chef", "rating", "image", "price", "healthLabels", "zipcode"],
    body:{
      "query": {
        "bool" : {
           "must" : [
              {"match": { "chefId": chefId }},
           ]
        }
      }
    }
  }).then(function (resp) {
      console.log('..............INSIDE')
      var hits = resp.hits.hits;
      console.log('HITS >>>>>>> ', hits);
      if (hits.length) {
        var newResult = [];
        for (var i = 0; i < hits.length; i++) {
          var orderInfo = hits[i]['_source'];
          var orderId = hits[i]['_id'];
          orderInfo['mealId'] = orderId;
          newResult.push(orderInfo);
        }
        dispatch(chefMealsSuccess(newResult));
        } else {
        dispatch(fetchFailure('sorry cannot be found'));
        }
        })
        .catch(err => dispatch(fetchFailure(err)));
      }
}

export function saveSearchQuery(searchQuery) {
  return dispatch => {
    console.log()
    axios('api/users/:id', searchQuery.userID)
    .then( results => {
      console.log('>>>>>MY RESULTS>>>>>>>>', results); //get the search results and append your stuff and then update it

      // axios('/api/updateusersearch', searchQuery)
      // .then( results => {
      //   console.log('>>>>>>>>>>>>>>passed user searchQuery to controller', results);
      // })

    })
    .catch( err => console.error(err));
  }
}

export function fetchOrders(searchQuery) {
    var userID = searchQuery.userID;
    var cuisine = searchQuery.cuisine || '*';
    var minPrice = searchQuery.minPrice || 0;
    var maxPrice = searchQuery.maxPrice || 1000000;
    var date = searchQuery.add_date;
    console.log('variables parsing:', cuisine, minPrice, maxPrice, date);

    console.log('..............Client.search')
    return dispatch => {

    dispatch(saveSearchQuery({
      userID: userID,
      cuisine: cuisine,
      minPrice: minPrice,
      maxPrice: maxPrice
    }));

    elasticClient.search({
      index: 'mwl',
      type: 'meal',
      size: 50,
      "_source": ["food", "chefId", "chef", "chefEmail", "cuisine", "chefAddress", "chefPhone", "quantity", "rating", "image", "price", "healthLabels", "zipcode"],
      // query: { "match_all": {} },
      body:{
        "query": {
          "bool" : {
             "must" :     [
                {"prefix": { "_all": cuisine }},
             //    {"match": { "chef": "Martha" }},
             //    {"match": {"healthLabels": "Tree-Nut-Free"}}
                // {"match": {"zipcode": zipcode}}
             //  ],//prefix
             // "filter":    [
                // {"range": {"date": {"lte": date}}},
                {"range": {"price": { "lt": maxPrice, "gt": minPrice }}},
             //    {"range": {"rating": { "gt": 2, "lt": 5}}}
             ]//price //range
          }//bool
        }//query
      }//body
    }).then(function (resp) {
        console.log('..............INSIDE')
        var hits = resp.hits.hits;
        console.log('HITS >>>>>>> ', hits);
        if (hits.length) {
          var newResult = [];
          for (var i = 0; i < hits.length; i++) {
            var orderInfo = hits[i]['_source'];
            var orderId = hits[i]['_id'];
            orderInfo['mealId'] = orderId;
            newResult.push(orderInfo);
          }
          dispatch(fetchSuccess(newResult));
          } else {
          dispatch(fetchFailure('No results can be found'));
          }
          })
          .catch(err => dispatch(fetchFailure(err)));
        }
}

export function updateMeal(result) {
  return {
    type: 'UPDATE_CURRENT_MEAL',
    data: result,
  };
}


export function loggy(response) {
  return {
    type: 'LOGIN_USER',
    data: response.data,
  };
}

export function logoutuser() {
  return {
    type: 'LOGOUT_USER',
  };
}

export function checkSession() {
  return {
    type: 'CHECK_SESSION_REQUEST',
  };
}

export function checkSessionResponse() {
  return {
    type: 'CHECK_SESSION_RESPONSE',
  }
}


/*
  Misc. queries
*/


/*
          // "filtered": {
          //   "query": {
          //     "prefix": { "food": "chicken" }//prefix
          //   },//query
          //   "filter": {
          //     // "term": { "chef": "Tom Weaver" }//term
          //     "range": {
          //       // "rating": { "gt": 4 },//rating
          //       "price": { "gte": 7 }//price
          //     },//range
          //     "range": {
          //       "rating": { "gte": 4 }//rating
          //     }//range

          //     // "range": {
          //     //   "rating": {
          //     //     "gt": 3
          //     //   },//rating
          //     // }//range
          //   }//filter
          // }//filtered
      //   }//query
      // }//body
*/


      // "healthLabels": "Gluten-Free"

      // food: {
      // }
      //   query: {
      //     match: {
      //       food: 'Chicken'
      //     }
      //   }
      // }



/*
  Old Data
*/
    // var elasticsearch = require('elasticsearch');
    // var client = new elasticsearch.Client({
    //   host: 'localhost:9200',
    //   log: 'trace'
    // });

    // console.log('..............Client.search')
    // client.search({
    //   index: 'mwl',
    //   type: 'meal',
    //   body: {
    //     query: {
    //       match: {
    //         food: 'chicken'
    //       }
    //     }
    //   }
    // }).then(function (resp) {
    //     console.log('..............INSIDE')
    //     var hits = resp.hits.hits;
    //     console.log(hits);
    // }, function (err) {
    //     console.trace(err.message);
    // });


// {/*`http://localhost:9200/mwl/meal/_search?q=${cuisine}`*/}
//     // var queryBaseUrl = 'http://localhost:9200/mwl/meal/_search?';
//     // var match = '{"query":{"prefix": {"food":' + cuisine + '}}}';
//     // var query = queryBaseUrl+match;

//     var queryBaseUrl = "http://localhost:9200/mwl/meal/_search?";
//     var match = '{"query":{"prefix":{"_all":"chick"}}}';
//     var query = queryBaseUrl+match;
//     console.log('QUERY >>>>>>>>>', query);



export function updateProfile(result) { //when user clicks update profile, everything in the current loginUser store will be put in postgres
  return {
    type: 'UPDATE_PROFILE',
    data: result,
  }
}


// return dispatch => {
//   dispatch(fetchRequest());
//   return fetch(`http://localhost:9200/meals/_search?q=${cuisine}`,
//     { method: 'GET', credentials: 'same-origin' })
//     .then(result => result.json())
//     .then( result => {
//       let newResult = [];
//       if (result.hits.hits.length) {
//         const results = result.hits.hits;
//         for (var i = 0; i < results.length; i++) {
//           newResult.push(results[i]['_source']);
//         }
//         dispatch(fetchSuccess(newResult));
//       } else {
//         dispatch(fetchFailure(Materialize.toast('Sorry, no results can be found', 4000)));
//       }
//     })
//     .catch(err => dispatch(fetchFailure(err)));
// };
