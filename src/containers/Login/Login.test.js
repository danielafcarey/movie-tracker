import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './Login';
import * as apiCalls from '../../apiCalls'

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('matches the snapshot', () => {
    // expect(wrapper).toMatchSnapshot();
  });

  it('has a default state of email and password', () => {

    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
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
  })

  describe('handleSubmit', () => {

    it('calls verifyUser with the correct arguments', () => {

    })

    it('calls alert if verifyUser returns undefined', () => {

    })

    it('calls props.updateCurrentUser with the correct arguments if user has been verified', () => {

    })

    it('calls getFavorites with correct arguments if user has been verified', () => {

    })

    it('calls props.updateFavorites with the correct arguments if user has been verfied', () => {

    })

    it()
  })
  
});
