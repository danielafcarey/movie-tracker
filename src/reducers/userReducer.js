import {
  updateCurrentUser
} from '../actions';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_USER':
      return action.id;
    default:
      return state;
  }
}; 

export {
  userReducer
}
