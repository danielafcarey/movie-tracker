import { cleanMovieData, cleanFavorites } from './cleaner';
import { mockMovies } from './mockData';

describe('Cleaner', () => {

  describe('cleanMovieData', () => {

    it('returns a cleaned array of objects when given data', () => {
      const expected = [{
        movieId: 299536,
        title: 'Avengers: Infinity War',
        image: 'http://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        rating: 8.6,
        favorite: false,
        releaseDate: '2018-04-25'
      }]

      const result = cleanMovieData(mockMovies.results.slice(0, 1))

      expect(result).toEqual(expected)
    })
  })

  describe('cleanFavorites', () => {

    it('returns an array of cleaned favorite objects', () => {
      const fetchedFavorites = [{
        id: 1,
        movie_id: 299536,
        user_id: 2,
        title: "Avengers: Infinity War",
        poster_path: "http://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        release_date: "2018-04-25",
        vote_average: "8.5",
        overview: ""
      }]
      const expected = [{
        movieId: 299536,
        title: 'Avengers: Infinity War',
        image: 'http://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        rating: "8.5",
        favorite: true,
        releaseDate: '2018-04-25'
      }]

      const result = cleanFavorites(fetchedFavorites);

      expect(result).toEqual(expected);
    })
  })
})
