import { 
  populateMovies,
  updateCurrentUser
} from './index.js';

describe('Action creators', () => {

  describe('populateMovies', () => {

    it('creates an action with correct payload and type', () => {
      const expected = {
        type: 'POPULATE_MOVIES',
        movies: ['movie']
      }
      const result = populateMovies(['movie']);

      expect(result).toEqual(expected);
    })

  })

  describe('updateCurrentUser', () => {

    it('creates an action with correct payload and type', () => {
      const expected = {
        type: 'UPDATE_CURRENT_USER',
        id: 1
      }
      const result = updateCurrentUser(1);

      expect(result).toEqual(expected);

    })
  })


})
