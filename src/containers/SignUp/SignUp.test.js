import React from 'react';
import { shallow } from 'enzyme';
import { 
  SignUp,
  mapDispatchToProps
} from './SignUp';
import * as apiCalls from '../../apiCalls';

describe('SignUp', () => {
  let wrapper;
  let mockUpdateCurrentUser;

  beforeEach(() => {
    mockUpdateCurrentUser = jest.fn()
    wrapper = shallow(<SignUp updateCurrentUser={mockUpdateCurrentUser}/>);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a default state of name, email, password, verification, emailError, and passwordError', () => {
    expect(wrapper.state('name')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('verification')).toEqual('');
    expect(wrapper.state('emailError')).toEqual('');
    expect(wrapper.state('passwordError')).toEqual('');
    expect(wrapper.state('authenticated')).toEqual(false);
  });

  it('changes the name in state on change in the name input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'name'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('name')).toEqual('garbage');
  });

  it('changes the email in state on change in the email input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'email'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('email')).toEqual('garbage');
  });

  it('changes the password in state on change in the password input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'password'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('password')).toEqual('garbage');
  });

  it('changes the verification in state on change in the verification input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'verification'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('verification')).toEqual('garbage');
  });

  describe('verifyPassword', () => {

    it('returns true and sets state if the password and verification match', () => {
      const mockState = {
        name: 'Nincompoop',
        email: 'nincompooping@gmail.com',
        password: 'ilovebabiesandgarbage',
        verification: 'ilovebabiesandgarbage',
        passwordError: 'Passwords must match'
      };

      wrapper.setState({ ...mockState });
      const result = wrapper.instance().verifyPassword();

      expect(result).toEqual(true);
      expect(wrapper.state('passwordError')).toEqual('');
    });

    it('returns false and sets state if the password does not match the verification', () => {
      const mockState = {
        name: 'Nincompoop',
        email: 'nincompooping@gmail.com',
        password: 'ilovebabiesandgarbage',
        verification: 'ihatebabiesbutilovegarbage'
      };

      wrapper.setState({ ...mockState });
      const result = wrapper.instance().verifyPassword();

      expect(result).toEqual(false);
      expect(wrapper.state('passwordError')).toEqual('Passwords must match');

    });

  });

  describe('verifyEmail', () => {

    it('calls fetchUsers', async () => {
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
      await wrapper.instance().verifyEmail();
      expect(apiCalls.fetchUsers).toHaveBeenCalled()
    });

    it('returns true if the user\'s email is not yet taken', async () => {
      wrapper.setState({ 
        email: 'foolsgold@gmail.com',
        emailError: 'Email has already been used'
      });

      const result =  await wrapper.instance().verifyEmail();

      expect(result).toEqual(true);
      expect(wrapper.state('emailError')).toEqual('');
    });

    it('returns false and sets state if the user\'s email is taken', async () => {
      wrapper.setState({ email: 'garbageman@gmail.com' });

      const result =  await wrapper.instance().verifyEmail();

      expect(result).toEqual(false);
      expect(wrapper.state('emailError')).toEqual('Email has already been used')
    });

  });


  describe('postUser', () => {

    it('calls fetch with the correct arguments', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(1)
        })
      });
      const mockState = {
        name: 'nincompoop',
        email: 'nincompooping@gmail.com',
        password: 'ilovebabiesandgarbage'
      };
      const expectedUrl = 'http://localhost:3000/api/users/new';
      const expectedOptionsObject = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockState) 
      };
      
      wrapper.setState({ ...mockState });
      wrapper.instance().postUser();

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject);
    });

  });

  describe('handleSubmit', () => {
    let mockEvent;

    beforeEach(() => {
      mockEvent = { preventDefault : () => {}}
    })

      it('calls verifyPassword', () => {
        const wrapperInst = wrapper.instance();
        wrapperInst.verifyPassword = jest.fn();
        wrapperInst.verifyEmail = jest.fn();
        wrapperInst.postUser = jest.fn();

        wrapperInst.handleSubmit(mockEvent);

        expect(wrapperInst.verifyPassword).toHaveBeenCalled();
      });
      
      it('calls updateCurrentUser with the correct arguments if password and email have been verified', async () => {
        const wrapperInst = wrapper.instance();
  
        wrapperInst.verifyPassword = jest.fn().mockImplementation(() => true);
        wrapperInst.verifyEmail = jest.fn().mockImplementation(() => true);
        wrapperInst.postUser = jest.fn().mockImplementation(() => 1);

        await wrapperInst.handleSubmit(mockEvent);

        expect(wrapperInst.props.updateCurrentUser).toHaveBeenCalledWith(1);
      });
      
      it('calls postUser with the correct arguments if password has been verified', async () => {
        const wrapperInst = wrapper.instance();
        wrapperInst.verifyPassword = jest.fn().mockImplementation(() => true);
        wrapperInst.verifyEmail = jest.fn().mockImplementation(() => true);
        wrapperInst.postUser = jest.fn();
        
        await wrapperInst.handleSubmit(mockEvent);

        expect(wrapperInst.postUser).toHaveBeenCalled();
      });

    it('sets state of authenticated to true', async () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyPassword = jest.fn().mockImplementation(() => true);
      wrapperInst.verifyEmail = jest.fn().mockImplementation(() => true);
      wrapperInst.postUser = jest.fn();

      await wrapperInst.handleSubmit(mockEvent);

      expect(wrapper.state('authenticated')).toEqual(true);
    }) 
       
    });

  describe('mapDispatchToProps', () => {
    
    it('returns an object with an updateCurrentUser function', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);

      expect(typeof result.updateCurrentUser).toEqual('function');
    });
  });

});






















