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


export {
  populateMovies,
  updateCurrentUser,
  updateFavorites
}
