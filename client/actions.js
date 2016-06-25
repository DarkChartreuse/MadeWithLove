import {
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  SAVE_SEARCH_QUERY,
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  REQUEST_POSTS,
  RECEIVE_POSTS
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
    result
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
  // return {
  // 	type: FETCH_REQUEST,
  // 	promise: fetch('/api/orders')
  // }
  console.log('THIS IS FIRING!!');
  return dispatch => {
  	console.log('hello');
    dispatch(fetchRequest());
    return fetch('/api/orders',
      { method: 'GET', credentials: 'same-origin' })
      .then(result => result.json())
      .then( result => {
        if(cuisine){
          var newResult = [];
          for(var i=0; i<result.length; i++) {
            if(result[i].cuisine === cuisine) {
              newResult.push(result[i]);
            }
          }
          dispatch(fetchSuccess(newResult));
        } else {
          dispatch(fetchSuccess(result));
        }
      })
      .catch(err => dispatch(fetchFailure(err)));
  };
}