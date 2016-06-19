// CHECKOUT_REQUEST
// CHECKOUT_FAILURE

export const rating = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_RATING':
      return state + 1;
    case 'DECREMENT_RATING':
      return state - 1;
    default:
      return state;
  }
};

export const quantity = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_RATING':
      return state + 1;
    case 'DECREMENT_RATING':
      return state - 1;
    default:
      return state;
  }
};

