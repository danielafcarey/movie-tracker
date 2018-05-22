import React from 'react';
import { shallow } from 'enzyme';
import { Header, mapDispatchToProps } from './Header';

describe('Header', () => {

  let wrapper;
  let mockUpdateCurrentUser;
  let mockUpdateFavorites;

  beforeEach(() => {
    mockUpdateCurrentUser = jest.fn();
    mockUpdateFavorites = jest.fn();
    wrapper = shallow(<Header
        updateCurrentUser={mockUpdateCurrentUser}
        updateFavorites={mockUpdateFavorites}
       />)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleClick', () => {

    it('calls props.updateCurrentUser with correct argument', () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.handleClick();
      expect(wrapperInst.props.updateCurrentUser).toHaveBeenCalledWith(null)
    })

    it('calls props.updateFavorites with correct argument', () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.handleClick();
      expect(wrapperInst.props.updateFavorites).toHaveBeenCalledWith([])
    })  
  })

  describe('mapDispatchToProps', () => {

    describe('updateCurrentUser', () => {
      it('returns an object with an updateCurrentUser function', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);

        expect(typeof result.updateCurrentUser).toEqual('function');
      });

      it('calls dispatch with the correct argument', () => {
        const dispatch = jest.fn();
        const mappedProps = mapDispatchToProps(dispatch)
        const mockAction = {
          type: 'UPDATE_CURRENT_USER',
          id: null
        }

        mappedProps.updateCurrentUser(mockAction.id)

        expect(dispatch).toHaveBeenCalledWith(mockAction)
      })
    })

    describe('updateFavorites', () => {
      it('returns an object with an updateFavorites function', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);

        expect(typeof result.updateFavorites).toEqual('function');
      });

      it('calls dispatch with the correct argument', () => {

        const dispatch = jest.fn();
        const mappedProps = mapDispatchToProps(dispatch)
        const mockAction = {
          type: 'UPDATE_FAVORITES',
          favorites: []
        }

        mappedProps.updateFavorites([])

        expect(dispatch).toHaveBeenCalledWith(mockAction)
      })
    })

  })
})
