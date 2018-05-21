import { 
  Card, 
  mapStateToProps, 
  mapDispatchToProps,
} from './Card'
import { shallow } from 'enzyme'
import React from 'react'
import * as apiCalls from '../../apiCalls';

describe('Card', () => {
  let mockProps;
  let wrapper;
  let mockMovieToPost;
  let mockMovieToStore;

  beforeEach(() => {
    mockProps = {
      movieId: 2342342,
      title: 'The Mighty Gasbag',
      rating: 100,
      releaseDate: 'tomorrow',
      image: 'www.flatulence.com/image/123132.png',
      favorite: false ,
      addFavorite: jest.fn(),
      userId: 1
    }
    wrapper = shallow(<Card {...mockProps} />)
    mockMovieToPost = {
      movie_id: 2342342, 
      title: 'The Mighty Gasbag',
      vote_average: 100,
      poster_path: 'www.flatulence.com/image/123132.png',
      release_date: 'tomorrow',
    };
    mockMovieToStore = {
      movieId: 2342342, 
      title: 'The Mighty Gasbag',
      rating: 100,
      image: 'www.flatulence.com/image/123132.png',
      favorite: false,
      releaseDate: 'tomorrow',

    }
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleClick', () => {

    it('calls apiCalls.postFavorite with the correct arguments if favorite is false', () => {
      const wrapperInst = wrapper.instance();
      const mockUserId = wrapperInst.props.userId;

      apiCalls.postFavorite = jest.fn();
      wrapperInst.handleClick();

      expect(apiCalls.postFavorite).toHaveBeenCalledWith(mockUserId, mockMovieToPost);
    })

    it('calls props.addFavorite with the correct arguments if favorite is false', () => {
      const wrapperInst = wrapper.instance();
      apiCalls.postFavorites = jest.fn();

      wrapperInst.handleClick();

      expect(wrapperInst.props.addFavorite).toHaveBeenCalledWith(mockMovieToStore);
    })

    it('calls apiCalls.removeFavorite with the correct arguments if favorite is true', () => {

    })

    it('calls props.removeFavorite with the correct arguments if favorite is true', () => {

    })

  })

  describe('mapStateToProps', () => {
  
    it('updates the currentUser props from state', () => {
      const mockState = {
        currentUser: 1,
        fakeProp: 'burritos'
      }

      const expected =  { userId: mockState.currentUser };
      const result = mapStateToProps(mockState);

      expect(result).toEqual(expected);
    })

  })

  describe('mapDispatchToProps', () => {
    
    it('returns an object with an addFavorite function', () => {
      const dispatch = jest.fn();

      const result = mapDispatchToProps(dispatch);

      expect(typeof result.addFavorite).toEqual('function');
    })

    it('calls dispatch with the correct arguments', () => {
      const dispatch = jest.fn();
      const mappedProps = mapDispatchToProps(dispatch);
      const mockAction = {
        type: 'ADD_FAVORITE',
        favoriteMovie: { name: 'movie1' }
      }

      mappedProps.addFavorite(mockAction.favoriteMovie);

      expect(dispatch).toHaveBeenCalledWith(mockAction);
    })

    it('returns an object with a deleteFavorite function', () => {
      const dispatch = jest.fn();

      const result = mapDispatchToProps(dispatch);

      expect(typeof result.deleteFavorite).toEqual('function');
    })

    it('calls dispatch with the correct arguments', () => {
      const dispatch = jest.fn();
      const mappedProps = mapDispatchToProps(dispatch);
      const mockAction = {
        type: 'DELETE_FAVORITE',
        movieId: 1
      }

      mappedProps.deleteFavorite(mockAction.movieId);

      expect(dispatch).toHaveBeenCalledWith(mockAction);
    })

  })

})





















