import React from 'react';
import { shallow } from 'enzyme';
import { mockMovies } from '../../mockData';
import { cleanMovieData } from '../../cleaner';
import { 
  Favorites, 
  mapStateToProps 
} from './Favorites';

describe('Favorites', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {
      favorites: cleanMovieData(mockMovies.results)
    };
    wrapper = shallow(<Favorites { ...mockProps } />);
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('matches the snapshot if the favorites array is empty', () => {
    mockProps = {
      favorites: []
    }
    wrapper = shallow(<Favorites { ...mockProps } />);

    expect(wrapper).toMatchSnapshot();
  })

  describe('mapStateToProps', () => {

    it('updates the favorites props with favorites from state', () => {
      const state = {
        favorites: ['an abandoned child', 'garbage'], 
        kiddens: false
      }
      const expected = state.favorites;
      const result = mapStateToProps(state);

      expect(result.favorites).toEqual(expected);
    })

  })

})
