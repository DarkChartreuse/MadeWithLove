import {
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,
} from './constants';
import Materialize from 'materialize-css';
import fetch from 'isomorphic-fetch';


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
    message,
  };
}

export function fetchOrders(cuisine) {
    var elasticsearch = require('elasticsearch');
    var client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });


    console.log('..............Client.search')
    return dispatch => { client.search({
      index: 'mwl',
      type: 'meal',
      size: 50,
      "_source": ["food", "chef", "rating", "price", "healthLabels", "zipcode"],
      // query: { "match_all": {} },
      body:{
        "query": { 
          "bool" : {
             "must" :     [
                {"prefix": { "_all": cuisine }},             
             //    {"match": { "chef": "Martha" }},
             //    {"match": {"healthLabels": "Tree-Nut-Free"}}
             //    // {"match": {"zipcode": 60302}}
             //  ],//prefix
             // "filter":    [
             //    // {"range": {"date": {"lte": Date.now()}}},
             //    {"range": {"price": { "lt": 13 }}}, 
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
<<<<<<< 90e9028dec7db76cf5d1159031d8c238d25c8a98
<<<<<<< 077438d0f54c00dadf9c71edc19ddf27b31e94de
=======
>>>>>>> resolved rebase issues
          var newResult = [];
          for (var i = 0; i < hits.length; i++) {
            var orderInfo = hits[i]['_source'];
            var orderId = hits[i]['_id'];
            orderInfo['mealId'] = orderId;
            newResult.push(orderInfo);
          }
          dispatch(fetchSuccess(newResult));
          } else {
          dispatch(fetchFailure('sorry cannot be found'));
          }
          })
          .catch(err => dispatch(fetchFailure(err)));
<<<<<<< 90e9028dec7db76cf5d1159031d8c238d25c8a98
        }
=======
          dispatch(fetchSuccess(hits));
        } else {
          dispatch(fetchFailure(Materialize.toast('Sorry, no results can be found', 4000)));
        }
      });

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
>>>>>>> synced with elastic search
=======
        }
>>>>>>> resolved rebase issues
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


export function updateMeal(result) {
  return {
    type: 'UPDATE_MEAL',
    data: result.data,
  }
}


