// WHATEVER HAS STATE

export const ADD_TODO = 'ADD_TODO';



export const INCREMENT_QUANTITY = 'INCREMENT_RATING';
export const DECREMENT_QUANTITY = 'DECREMENT_RATING';

export const INCREMENT_RATING = 'INCREMENT_RATING';
export const DECREMENT_RATING = 'DECREMENT_RATING';

case 'CURRENT_SEARCH':
  return {
    id: action.id,
    text: action.text,
    completed: false
  }