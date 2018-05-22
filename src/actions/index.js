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

const updateMovies = (favorites) => {
  return {
    type: 'UPDATE_MOVIES',
    favorites
  }
}

const addFavoriteToMovies = (favoriteMovie) => {
  return {
    type: 'ADD_FAVORITE_TO_MOVIES',
    favoriteMovie
  }
}

const deleteFavoriteFromMovies = (movieId) => {
  return {
    type: 'DELETE_FAVORITE_FROM_MOVIES',
    movieId
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
  updateMovies,
  addFavoriteToMovies,
  deleteFavoriteFromMovies,
  addFavoriteToFavorites, 
  deleteFavoriteFromFavorites
}
