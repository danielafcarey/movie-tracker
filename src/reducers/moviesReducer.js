const moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'POPULATE_MOVIES':
      return [...action.movies];
    case 'UPDATE_MOVIES':
      const updatedMovies = [...state];
      updatedMovies.forEach(movie => {
        if (action.favorites.find(favorite => movie.movieId === favorite.movieId)) {
          movie.favorite = true;
        }
      })
      return updatedMovies;
    case 'ADD_FAVORITE_TO_MOVIES':
      const newState = [...state];
      newState.forEach(movie => {
        if (movie.movieId === action.favoriteMovie.movieId) {
          movie.favorite = true 
        }
      }) 
      return newState;
    case 'DELETE_FAVORITE_FROM_MOVIES':
      const updatedState = [...state];
      updatedState.forEach(movie => {
        if (movie.movieId === action.movieId) {
          movie.favorite = false
        }
      })
      return updatedState;
    default:
      return state;
  }
}

export default moviesReducer;
