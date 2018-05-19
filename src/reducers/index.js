import { combineReducers } from 'redux';
import movies from './moviesReducer';
import currentUser from './userReducer';
import favorites from './favoritesReducer';

const rootReducer = combineReducers({
  movies,
  currentUser,
  favorites
});

export default rootReducer;
