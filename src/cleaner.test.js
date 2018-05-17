import { cleanMovieData } from './cleaner';
import { mockMovies } from './mockData';

describe('Cleaner', () => {

  describe('cleanMovieData', () => {

    it('returns a cleaned array of objects when given data', () => {
      const expected = [{
        id: 299536,
        title: 'Avengers: Infinity War',
        image: 'http://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        rating: 8.6,
        favorite: false
      }]

      const result = cleanMovieData(mockMovies.results.slice(0, 1))

      expect(result).toEqual(expected)
    })
  })
})