import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps } from './Login';
import * as apiCalls from '../../apiCalls';
import { mockFavorites } from '../../mockData'
import * as cleaner from '../../cleaner';

describe('Login', () => {
  let wrapper;
  let mockUpdateCurrentUser;
  let mockUpdateFavorites;

  beforeEach(() => {
    mockUpdateCurrentUser = jest.fn();
    mockUpdateFavorites = jest.fn();
    wrapper = shallow(<Login 
      updateCurrentUser={mockUpdateCurrentUser}
      updateFavorites={mockUpdateFavorites}
      />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a default state of email, password, id, verified, and loginError', () => {

    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
    expect(wrapper.state('id')).toEqual(null)
    expect(wrapper.state('verified')).toEqual(false)
    expect(wrapper.state('loginError')).toEqual('')
    
  })

  it('changes email in state onChange', () => {
    const mockEvent = { target: { value: 'garbage', name: 'email'}}
    wrapper.instance().handleChange(mockEvent)

    expect(wrapper.state('email')).toEqual(mockEvent.target.value)
  })

  it('changes password in state onChange', () => {
    const mockEvent = { target: { value: 'garbage', name: 'password' } }
    wrapper.instance().handleChange(mockEvent)

    expect(wrapper.state('password')).toEqual(mockEvent.target.value)
  })

  describe('verifyUser', () => {

    beforeEach(() => {
      
      apiCalls.fetchUsers = jest.fn().mockImplementation(() => {
        return [
          {
            id: 1,
            email: 'garbageman@gmail.com',
            password: 'ismellbad',
            name: 'jerry'
          }
        ]
      })

      const mockState = {
        email: 'garbageman@gmail.com',
        password: 'ismellbad'
      }

      wrapper.setState(mockState);
    })

    it('calls fetchUsers', async () => {
      
      await wrapper.instance().verifyUser()

      expect(apiCalls.fetchUsers).toHaveBeenCalled();
    })

    it('returns userId and sets state if there is a match', async () => {
      wrapper.setState({ loginError: 'Invalid email or password' }) 
      const result = await wrapper.instance().verifyUser();
      const expected = 1;

      expect(result).toEqual(expected)
      expect(wrapper.state('loginError')).toEqual('')
    })

    it('returns undefined if there is no match', async () => {
      const badState = {
        email: 'trashman@gmail.com',
        password: 'ismellbad'
      }

      wrapper.setState(badState);

      const result = await wrapper.instance().verifyUser()
      const expected = undefined;

      expect(result).toEqual(expected);
      expect(wrapper.state('loginError')).toEqual('Invalid email or password')
    })

    
  })

  describe('handleSubmit', () => {
    let mockEvent;

    beforeEach(() => {
      mockEvent = {preventDefault: () => {}}
    })

    it('calls verifyUser', () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn();
      apiCalls.fetchFavorites = jest.fn();
      cleaner.cleanFavorites = jest.fn();

      wrapperInst.handleSubmit(mockEvent);

      expect(wrapperInst.verifyUser).toHaveBeenCalled();
    })

    it('calls props.updateCurrentUser with the correct arguments if user has been verified', async () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn().mockImplementation(() => 1);
      apiCalls.fetchFavorites = jest.fn();

      await wrapperInst.handleSubmit(mockEvent);

      expect(wrapperInst.props.updateCurrentUser).toHaveBeenCalledWith(1)
    })

    it('calls fetchFavorites with correct arguments if user has been verified', async () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn().mockImplementation(() => 1)
      apiCalls.fetchFavorites = jest.fn();
      
      await wrapperInst.handleSubmit(mockEvent);

      expect(apiCalls.fetchFavorites).toHaveBeenCalledWith(1); 
    })

    it('calls cleanFavorites with correct arguments if user has been verified', async () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn().mockImplementation(() => 1)
      apiCalls.fetchFavorites = jest.fn().mockImplementation(() => ['favorites']);
      cleaner.cleanFavorites = jest.fn();
      
      await wrapperInst.handleSubmit(mockEvent);

      expect(cleaner.cleanFavorites).toHaveBeenCalledWith(['favorites']); 

    })

    it('calls props.updateFavorites with the correct arguments if user has been verfied', async () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn().mockImplementation(() => 1)
      apiCalls.fetchFavorites = jest.fn();
      cleaner.cleanFavorites = jest.fn().mockImplementation(() => ['favorite'])

      await wrapperInst.handleSubmit(mockEvent);

      expect(wrapperInst.props.updateFavorites).toHaveBeenCalledWith(['favorite'])
    })

    it('updates state with current user id and verification status', async () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn().mockImplementation(() => 1)
      apiCalls.fetchFavorites = jest.fn().mockImplementation(() => {
        return ['favorite']
      });

      await wrapperInst.handleSubmit(mockEvent);
      
      expect(wrapper.state('id')).toEqual(1);
      expect(wrapper.state('verified')).toEqual(true)
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
          id: 1
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
          favorites: mockFavorites.data
        }

        mappedProps.updateFavorites(mockFavorites.data)

        expect(dispatch).toHaveBeenCalledWith(mockAction)
      })
    })

  })
});
