const moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'POPULATE_MOVIES':
      return [...action.movies];
    case 'ADD_FAVORITE':
      const newState = [...state];
      newState.forEach(movie => {
        if (movie.movieId === action.favoriteMovie.movieId) {
          movie.favorite = true 
        }
      }) 
      return newState;
    case 'DELETE_FAVORITE':
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
