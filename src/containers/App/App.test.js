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
  
  describe('componentDidMount', async () => {

    it('calls fetchMovies', () => {
      apiCalls.fetchMovies = jest.fn().mockImplementation(() => {
        return { results: ['movies'] }
      });
      cleaner.cleanMovieData = jest.fn();
      const mockPopulateMovies = jest.fn();
      const wrapper = shallow(<App populateMovies={ mockPopulateMovies } />);

      expect(apiCalls.fetchMovies).toHaveBeenCalled();

    })

    it('calls cleanMovieData with the correct arguments', () => {
      apiCalls.fetchMovies = jest.fn().mockImplementation(() => {
        return { results: ['movies'] }
      });
      cleaner.cleanMovieData = jest.fn();
      const mockPopulateMovies = jest.fn();
      const wrapper = shallow(<App populateMovies={ mockPopulateMovies } />);

      expect(cleaner.cleanMovieData).toHaveBeenCalledWith(['movies']);
    });

    it('calls props.populateMovies with the correct arguments', () => {
      apiCalls.fetchMovies = jest.fn().mockImplementation(() => {
        return { results: ['movies'] }
      });
      cleaner.cleanMovieData = jest.fn().mockImplementation(() => ['movies']);
      const mockPopulateMovies = jest.fn();
      const wrapper = shallow(<App populateMovies={ mockPopulateMovies } />);

      expect(wrapper.instance().props.populateMovies).toHaveBeenCalledWith(['movies']);

    })

  });
});












