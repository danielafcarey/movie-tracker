const favoritesReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_FAVORITES':
      return action.favorites;
    case 'ADD_FAVORITE':
      const newFavorite = { ...action.favoriteMovie, favorite: true }
      return [...state, newFavorite];
    case 'DELETE_FAVORITE':
      const newState = [...state];
      const newFavorites = newState.filter(movie => {
        return movie.movieId !== action.movieId
      })
      return newFavorites;
    default:
      return state;
  }
}

export default favoritesReducer;
