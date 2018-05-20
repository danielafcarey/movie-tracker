const cleanMovieData = (movies) => {
  const cleanMovies = movies.map(({ 
    id, 
    title, 
    vote_average: rating, 
    poster_path, 
    release_date: releaseDate
  }) => {
    const image = `http://image.tmdb.org/t/p/original${poster_path}`
    return {
      movieId: id,
      title, 
      rating,
      image,
      favorite: false,
      releaseDate
    }
  })
  return cleanMovies
} 

const cleanFavorites = (fetchedFavorites) => {
  const cleanedFavorites = fetchedFavorites.map(({
    id,
    movie_id: movieId,
    title,
    poster_path: image,
    release_date: releaseDate,
    vote_average: rating
  }) => {
    return {
      movieId,
      title,
      rating,
      image,
      favorite: true,
      releaseDate
    }
  })

  return cleanedFavorites; 
}

export {
  cleanMovieData,
  cleanFavorites
}
