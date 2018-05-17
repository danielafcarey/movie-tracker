const cleanMovieData = (movies) => {
  const cleanMovies = movies.map(({ id, title, vote_average: rating, poster_path}) => {
    const image = `http://image.tmdb.org/t/p/original${poster_path}`
    return {
      id,
      title, 
      rating,
      image,
      favorite: false
    }
  })
  return cleanMovies
} 

export {
  cleanMovieData
}