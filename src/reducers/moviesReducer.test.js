import moviesReducer from './moviesReducer';

describe('moviesReducer', () => {

  it('returns the previous state if action type is invalid', () => {
    const action = {
      type: 'EAT_GARBAGE'
    };

    const expected = [];
    const result = moviesReducer(undefined, action);

    expect(result).toEqual(expected);
  })

  it('returns new state when given an action type of POPULATE_MOVIES', () => {
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

  it('returns new state when given an action type of ADD_FAVORITE', () => {
    const state = [{ movieId: 1, favorite: false }]
    const favoriteMovie = { movieId: 1, favorite: true }
    
    const action = {
      type: 'ADD_FAVORITE', 
      favoriteMovie
    }

    const expected = [favoriteMovie];
    const result = moviesReducer(state, action);

    expect(result).toEqual(expected);
  })

  it('returns new state when given an action type of DELETE_FAVORITE', () => {
    const state = [{ movieId: 1, favorite: true }]
    const movieId = 1 
    
    const action = {
      type: 'DELETE_FAVORITE', 
      movieId
    }

    const expected = [{ movieId: 1, favorite: false }];
    const result = moviesReducer(state, action);

    expect(result).toEqual(expected);

  })

})
