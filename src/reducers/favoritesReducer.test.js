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

  it('returns new state when given an action type of ADD_FAVORITE', () => {
    const state = [{ name: 'oldMovie' }];
    const favorite = { name: 'newMovie' }
    const action = {
      type: 'ADD_FAVORITE',
      favorite
    }

    const expected = [...state, favorite];
    const result = favoritesReducer(state, action);

    expect(result).toEqual(expected);
  })

})
