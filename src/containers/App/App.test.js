import React from 'react';
import ReactDOM from 'react-dom';
import { 
  mapStateToProps,
  mapDispatchToProps,
  App
} from './App';
import { shallow } from 'enzyme';
import { fetchMovies } from '../../apiCalls';
import { cleanMovieData } from '../../cleaner';
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
  
  // describe('componentDidMount', async () => {
  //   it('calls cleanMovieData with the correct arguments', () => {
  //     // console.log(cleanMovieData.toString());
  //     const foo = cleanMovieData(mockMovies.results)
  //     console.log(foo)
  //     const wrapper = shallow( <App populateMovies={ jest.fn() }/> );
  //     const spy = jest.spyOn(wrapper, 'cleanMovieData');
  //     expect(cleanMovieData).toHaveBeenCalledWith(mockMovies.results);
  //   });
  // });
});
