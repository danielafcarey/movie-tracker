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

export {
  cleanMovieData
}
