import { combineReducers } from 'redux';
import movies from './moviesReducer';
import currentUser from './userReducer';

const rootReducer = combineReducers({
  movies,
  currentUser
});

export default rootReducer;
