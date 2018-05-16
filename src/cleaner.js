const cleanMovieData = (movies) => {
  const cleanMovies = movies.map(({ id, title, vote_average: rating, poster_path}) => {
    const image = `https://themoviedb.org/documentation/api/${id}${poster_path}`
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