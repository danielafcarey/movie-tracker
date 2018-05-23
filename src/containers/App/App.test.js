import React from 'react';
import ReactDOM from 'react-dom';
import { 
  mapDispatchToProps,
  App
} from './App';
import { shallow } from 'enzyme';
import * as apiCalls from '../../apiCalls';
import * as cleaner from '../../cleaner';
import { mockMovies } from '../../mockData';
jest.mock('../../apiCalls');
 

describe('App', () => {

  it('matches the snapshot', () => {
    const mockPopulateMovies = jest.fn();
    const wrapper = shallow(<App populateMovies={ mockPopulateMovies }/>);

    expect(wrapper).toMatchSnapshot();
  })
  
  describe('mapDispatchToProps', () => {
    
    it('returns an object with a populateMovies function', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      
      expect(typeof result.populateMovies).toEqual('function');
    });

    it('calls dispatch with the correct arguments', () => {
      const dispatch = jest.fn();
      const mappedProps = mapDispatchToProps(dispatch);
      const mockAction = {
        type: 'POPULATE_MOVIES',
        movies: ['I am a movie']
      }

      mappedProps.populateMovies(mockAction.movies);

      expect(dispatch).toHaveBeenCalledWith(mockAction);
    })
    
  });
  
  describe('componentDidMount', () => {

    it('calls props.populateMovies with the correct arguments', async () => {
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












