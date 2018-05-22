import favoritesReducer from './favoritesReducer';

describe('favoritesReducer', () => {

  it('returns the previous state if action type is invalid', () => {
    const action = {
      type: 'GARBAGE_MAN_WITH_A_GARBAGE_PLAN'
    }

    const expected = []
    const result = favoritesReducer(undefined, action);

    expect(result).toEqual(expected);

  })

  it('returns new state when given an action type of UPDATE_FAVORITES', () => {
    const state = [];
    const favorites = ['Garbage Man Saves the Day', 'Garbage Man II, the Return of the TrashMonster']
    const action = {
      type: 'UPDATE_FAVORITES',
      favorites
    }

    const expected = favorites;
    const result = favoritesReducer(state, action)

    expect(result).toEqual(expected);
  })

  it('returns new state when given an action type of ADD_FAVORITE_TO_FAVORITES', () => {
    const state = [{ name: 'oldMovie' }];
    const favoriteMovie = { name: 'newMovie', favorite: true }
    const action = {
      type: 'ADD_FAVORITE_TO_FAVORITES',
      favoriteMovie
    }

    const expected = [...state, favoriteMovie];
    const result = favoritesReducer(state, action);

    expect(result).toEqual(expected);
  })

  it('returns new state when given an action type of DELETE_FAVORITE_FROM_FAVORITES', () => {
    const state = [
      { movieId: 2 }, 
      { movieId: 1 },
      { movieId: 3 }
    ];
    const movieToDelete = 1;
    const action = {
      type: 'DELETE_FAVORITE_FROM_FAVORITES',
      movieId: movieToDelete
    } 

    const expected = [
      { movieId: 2 }, 
      { movieId: 3 }
    ];
    const result = favoritesReducer(state, action);

    expect(result).toEqual(expected);
  })

})
