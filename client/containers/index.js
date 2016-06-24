import React from 'react'
import { connect } from 'react-redux';


let Counter = ({counter, onIncrement, onDecrement}) =>
 (<div>
    <div>{counter}</div>
    <button onClick={onDecrement}>-</button>
    <button onClick={onIncrement}>+</button>
  </div>);
const mapStateToProps = (state) => {
  return {counter: state.counter};
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({type: 'INCREMENT_QUANTITY'}),
    onDecrement: () => dispatch({type: 'DECREMENT_QUANTITY'})
  }
}
Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default Counter;