import { moviesReducer } from './moviesReducer';

describe('moviesReducer', () => {

  it('should return new state when given an action type of POPULATE_MOVIES', () => {
    const state = [];
    const movies = ['Forrest Gump', 'The Sandlot', 'A Mighty Wind']
    const action = {
      type: 'POPULATE_MOVIES',
      movies
    }
    
    const expected = movies;
    const result = moviesReducer(state, action);

    expect(result).toEqual(expected);
  })

  it('should return the previous state if action type is invalid', () => {
    const action = {
      type: 'EAT_GARBAGE'
    };

    const expected = [];
    const result = moviesReducer(undefined, action);

    expect(result).toEqual(expected);
  })
})
