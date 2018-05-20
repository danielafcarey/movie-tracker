const moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'POPULATE_MOVIES':
      return [...action.movies];
    case 'ADD_FAVORITE':
      const newState = [...state];
      newState.map(movie => {
        if (movie.movieId === action.favoriteMovie.movieId) {
          movie.favorite = true 
        }
        return movie
      }) 
      return [...newState]
    default:
      return state;
  }
}

export default moviesReducer;
