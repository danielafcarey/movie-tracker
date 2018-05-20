const favoritesReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_FAVORITES':
      return action.favorites;
    case 'ADD_FAVORITE':
      return [...state, action.favorite];
    default:
      return state;
  }
}

export default favoritesReducer;
