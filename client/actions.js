import {
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,
} from './constants';

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
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(`http://localhost:9200/meals/_search?q=${cuisine}`,
      { method: 'GET', credentials: 'same-origin' })
      .then(result => result.json())
      .then( result => {
        let newResult = [];
        if (result.hits.hits.length) {
          const results = result.hits.hits;
          for (var i = 0; i < results.length; i++) {
            newResult.push(results[i]['_source']);
          }  
          dispatch(fetchSuccess(newResult));
        } else {
          dispatch(fetchFailure(Materialize.toast('Sorry, no results can be found', 4000)));
        }
      })
      .catch(err => dispatch(fetchFailure(err)));
  };
}


export function loggy(response) {
  return {
    type: 'LOGIN_USER',
    data: response.data,
  };
}

