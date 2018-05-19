import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps } from './Login';
import * as apiCalls from '../../apiCalls'

describe('Login', () => {
  let wrapper;
  let mockUpdateCurrentUser;

  beforeEach(() => {
    mockUpdateCurrentUser = jest.fn();
    wrapper = shallow(<Login updateCurrentUser={mockUpdateCurrentUser}/>);
  });

  it('matches the snapshot', () => {
    // expect(wrapper).toMatchSnapshot();
  });

  it('has a default state of email, password, and id', () => {

    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
    expect(wrapper.state('id')).toEqual(null)
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

    it('calls fetchUsers', () => {
      
      wrapper.instance().verifyUser()

      expect(apiCalls.fetchUsers).toHaveBeenCalled();
    })

    it('returns userId if there is a match', async () => {
      
      const result = await wrapper.instance().verifyUser();
      const expected = 1;

      expect(result).toEqual(expected)
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
    })

    it('updates state with current user id', async () => {

      await wrapper.instance().verifyUser();

      expect(wrapper.state('id')).toEqual(1);

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

      wrapperInst.handleSubmit(mockEvent);

      expect(wrapperInst.verifyUser).toHaveBeenCalled();
    })

    it('calls props.updateCurrentUser with the correct arguments if user has been verified', () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn().mockImplementation(() => 1);

      wrapperInst.handleSubmit(mockEvent);

      expect(wrapperInst.props.updateCurrentUser).toHaveBeenCalledWith(1)
    })

    it('calls getFavorites with correct arguments if user has been verified', () => {

    })

    it('calls props.updateFavorites with the correct arguments if user has been verfied', () => {

    })

    it('sets authenticated to true in state', () => {

    })

    it('calls alert if verifyUser returns undefined', () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyUser = jest.fn().mockImplementation(() => undefined);
      window.alert = jest.fn();

      wrapperInst.handleSubmit(mockEvent);

      expect(window.alert).toHaveBeenCalled();

    })


  })
  
  describe('mapDispatchToProps', () => {

    it('returns an object with an updateCurrentUser function', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);

      expect(typeof result.updateCurrentUser).toEqual('function');
    });

  })
});
