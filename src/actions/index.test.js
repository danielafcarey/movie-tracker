import { 
  populateMovies,
  updateCurrentUser,
  updateFavorites,
  addFavorite
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
      };
      const result = updateCurrentUser(1);

      expect(result).toEqual(expected);

    })
  })

  describe('updateFavorites', () => {

    it('creates an action with correct payload and type', () => {
      const expected = {
        type: 'UPDATE_FAVORITES',
        favorites: ['favorites']
      };

      const result = updateFavorites(expected.favorites);

      expect(result).toEqual(expected);
    })
  })

  describe('addFavorite', () => {

    it('creates an action with correct payload and type', () => {
      const expected = {
        type: 'ADD_FAVORITE',
        favoriteMovie: {
          movieId: 1,
          title: 'PopPop Saves the Day', 
          rating: 1000,
          image: 'gohere',
          favorite: false,
          releaseDate: 'tomorrow'
        }
      }

      const result = addFavorite(expected.favoriteMovie);

      expect(result).toEqual(expected);
    })
  })
})
