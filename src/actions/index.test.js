import { populateMovies } from './index.js';

describe('Action creators', () => {

  describe('populateMovies', () => {

    it('creats an action with correct payload and type', () => {
      const expected = {
        type: 'POPULATE_MOVIES',
        movies: ['movie']
      }
      const result = populateMovies(['movie']);

      expect(result).toEqual(expected);
    })

  })


})
