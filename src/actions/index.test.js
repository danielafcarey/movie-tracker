import { 
  populateMovies,
  updateCurrentUser,
  updateFavorites,
  addFavoriteToFavorites,
  deleteFavoriteFromFavorites
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

  describe('addFavoriteToFavorites', () => {

    it('creates an action with correct payload and type', () => {
      const expected = {
        type: 'ADD_FAVORITE_TO_FAVORITES',
        favoriteMovie: {
          movieId: 1,
          title: 'PopPop Saves the Day', 
          rating: 1000,
          image: 'gohere',
          favorite: false,
          releaseDate: 'tomorrow'
        }
      }

      const result = addFavoriteToFavorites(expected.favoriteMovie);

      expect(result).toEqual(expected);
    })
  })

  describe('deleteFavoriteFromFavorites', () => {
    
    it('creates an action with correct payload and type', () => {
      const expected = {
        type: 'DELETE_FAVORITE_FROM_FAVORITES',
        movieId: 1
      }

      const result = deleteFavoriteFromFavorites(1);

      expect(result).toEqual(expected);
    })
  })

})
