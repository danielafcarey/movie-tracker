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

const addFavorite = (favoriteMovie) => {
  return {
    type: 'ADD_FAVORITE',
    favoriteMovie
  }
}


export {
  populateMovies,
  updateCurrentUser,
  updateFavorites,
  addFavorite
}
