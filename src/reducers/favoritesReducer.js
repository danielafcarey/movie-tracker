const favoritesReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_FAVORITES':
      return action.favorites;
    case 'ADD_FAVORITE':
      const newFavorite = { ...action.favoriteMovie, favorite: true }
      return [...state, newFavorite];
    default:
      return state;
  }
}

export default favoritesReducer;
