import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from './SignUp';

describe('SignUp', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have a default state of name, email, password, and verification', () => {
    expect(wrapper.state('name')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('verification')).toEqual('');
  })

  it('should change the name in state on change in the name input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'name'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('name')).toEqual('garbage');
  })

  it('should change the email in state on change in the email input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'email'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('email')).toEqual('garbage');
  })

  it('should change the password in state on change in the password input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'password'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('password')).toEqual('garbage');
  })

  it('should change the verification in state on change in the verification input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'verification'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('verification')).toEqual('garbage');
  })

  describe('verifyPassword', () => {

    it('should return true if the password and verification match', () => {
      const mockState = {
        name: 'Nincompoop',
        email: 'nincompooping@gmail.com',
        password: 'ilovebabiesandgarbage',
        verification: 'ilovebabiesandgarbage'
      }

      wrapper.setState({ ...mockState })
      const result = wrapper.instance().verifyPassword();

      expect(result).toEqual(true);
    })

    it('should return false if the password does not match the verification', () => {
      const mockState = {
        name: 'Nincompoop',
        email: 'nincompooping@gmail.com',
        password: 'ilovebabiesandgarbage',
        verification: 'ihatebabiesbutilovegarbage'
      }

      wrapper.setState({ ...mockState })
      const result = wrapper.instance().verifyPassword();

      expect(result).toEqual(false);

    })
  })

  describe('handleSubmit', () => {

    it('should call verifyPassword with the correct arguments', () => {

    })

    it('should call addUser with the correct arguments', () => {
      // dispatched method
    })

    it('should call postUser with the correct arguments', () => {
      // fetch
    })

  })


  
})






















