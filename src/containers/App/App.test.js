import React from 'react';
import ReactDOM from 'react-dom';
import { 
  mapStateToProps,
  mapDispatchToProps,
  App
} from './App';


describe('App', () => {

  describe('mapStateToProps', () => {

    it('should update App props with movies from state', () => {
      const state = {
        movies: ['Life is Beautiful', 'Singing in the Rain'],
        puppies: 'are good'
      };

      const expected = state.movies;
      const result = mapStateToProps(state);

      expect(result.movies).toEqual(expected);
    })
  })
})
