import React from 'react';
import ReactDOM from 'react-dom';
import { 
  mapStateToProps,
  mapDispatchToProps,
  App
} from './App';
import { shallow } from 'enzyme';
import * as apiCalls from '../../apiCalls';
import * as cleaner from '../../cleaner';
import { mockMovies } from '../../mockData';
jest.mock('../../apiCalls');
 

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
    });
    
  });
  
  describe('mapDispatchToProps', () => {
    
    it('returns an object with a populateMovies function', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      
      expect(typeof result.populateMovies).toEqual('function');
    });

    it('calls dispatch with the correct arguments', () => {

    })
    
  });
  
  describe('componentDidMount', () => {

    it.only('calls props.populateMovies with the correct arguments', async () => {
      apiCalls.fetchMovies = jest.fn().mockImplementation(() => {
        return Promise.resolve({ results: ['movies'] });
      });
      cleaner.cleanMovieData = jest.fn().mockImplementation(() => ['movies']);
      const mockPopulateMovies = jest.fn();
      const wrapper = await shallow(<App populateMovies={ mockPopulateMovies } />);

      expect(wrapper.instance().props.populateMovies).toHaveBeenCalledWith(['movies']);

    })

  });
});












