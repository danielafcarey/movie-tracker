import React from 'react';
import { shallow } from 'enzyme';
import { 
  Movies,
  mapStateToProps,
  mapDispatchToProps
} from './Movies';
import { mockMovies } from '../../mockData';
import { cleanMovieData } from '../../cleaner';


describe('Movies', () => {
  let cleanMovies;

  beforeEach(() => {
    cleanMovies = cleanMovieData(mockMovies.results);
  })

  it('should match the snapshot', () => {
    const wrapper = shallow(<Movies movies={ cleanMovies }/>);

    expect(wrapper).toMatchSnapshot();
  })


  describe('mapStateToProps', () => {
    
    it('updates the Movies props with movies from state', () => {
      const state = {
        movies: ['movie1', 'movie2'],
        extraState: 'this is to test that it only gets movies'
      };

      const expected = state.movies;
      const result = mapStateToProps(state);

      expect(result.movies).toEqual(expected);
    })
  })


})

