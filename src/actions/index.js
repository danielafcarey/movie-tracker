const populateMovies = (movies) => {
  return {
    type: 'POPULATE_MOVIES',
    movies
  }
}

const updateCurrentUser = (id) => {
  return {
    type: 'UPDATE_CURRENT_USER',
    id
  }
}

const updateFavorites = (favorites) => {
  return {
    type: 'UPDATE_FAVORITES',
    favorites
  }
}

const addFavoriteToFavorites = (favoriteMovie) => {
  return {
    type: 'ADD_FAVORITE_TO_FAVORITES',
    favoriteMovie
  }
}

const deleteFavoriteFromFavorites = (movieId) => {
  return {
    type: 'DELETE_FAVORITE_FROM_FAVORITES',
    movieId
  }
}

export {
  populateMovies,
  updateCurrentUser,
  updateFavorites,
  addFavoriteToFavorites, 
  deleteFavoriteFromFavorites
}
