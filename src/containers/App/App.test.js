import React from 'react';
import ReactDOM from 'react-dom';
import { 
  mapStateToProps,
  mapDispatchToProps,
  App
} from './App';


describe('App', () => {

  describe('mapStateToProps', () => {

    it('updates App props with movies from state', () => {
      const state = {
        movies: ['Life is Beautiful', 'Singing in the Rain'],
        puppies: 'are good'
      };

      const expected = state.movies;
      const result = mapStateToProps(state);

      expect(result.movies).toEqual(expected);
    })

  })

  describe('mapDispatchToProps', () => {

    it('returns an object with a populateMovies function', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);

      expect(typeof result.populateMovies).toEqual('function');
    })

  })
})
