import React from 'react';
import { shallow } from 'enzyme';
import { 
  SignUp,
  mapDispatchToProps
} from './SignUp';

describe('SignUp', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state of name, email, password, and verification', () => {
    expect(wrapper.state('name')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('verification')).toEqual('');
  });

  it('should change the name in state on change in the name input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'name'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('name')).toEqual('garbage');
  });

  it('should change the email in state on change in the email input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'email'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('email')).toEqual('garbage');
  });

  it('should change the password in state on change in the password input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'password'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('password')).toEqual('garbage');
  });

  it('should change the verification in state on change in the verification input', () => {
    const mockEvent = { target: { 
      value: 'garbage', 
      name: 'verification'
    } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('verification')).toEqual('garbage');
  });

  describe('verifyPassword', () => {

    it('should return true if the password and verification match', () => {
      const mockState = {
        name: 'Nincompoop',
        email: 'nincompooping@gmail.com',
        password: 'ilovebabiesandgarbage',
        verification: 'ilovebabiesandgarbage'
      };

      wrapper.setState({ ...mockState });
      const result = wrapper.instance().verifyPassword();

      expect(result).toEqual(true);
    });

    it('should return false if the password does not match the verification', () => {
      const mockState = {
        name: 'Nincompoop',
        email: 'nincompooping@gmail.com',
        password: 'ilovebabiesandgarbage',
        verification: 'ihatebabiesbutilovegarbage'
      };

      wrapper.setState({ ...mockState });
      const result = wrapper.instance().verifyPassword();

      expect(result).toEqual(false);

    });

  });

  describe('postUser', () => {

    it('should call fetch with the correct arguments', () => {
      window.fetch = jest.fn();
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

    it.skip('calls verifyPassword', () => {
      const wrapperInst = wrapper.instance();
      wrapperInst.verifyPassword = jest.fn();
      wrapperInst.props.updateCurrentUser = jest.fn();

      wrapper.find('form').simulate('submit', { preventDefault() {} });

      expect(wrapperInst.verifyPassword).toHaveBeenCalled(); 
    });

    it.skip('calls updateCurrentUser with the correct arguments if password has been verified', () => {
      const mockUpdateUser = jest.fn();
      wrapper = shallow(<SignUp updateCurrentUser={ mockUpdateUser } />);

      wrapper.find('form').simulate('submit', { preventDefault() {} });

      expect(mockUpdateUser).toHaveBeenCalled();
    });

    it.skip('calls postUser with the correct arguments if password has been verified', () => {
      const wrapperInst = wrapper.instance();
       
      wrapperInst.postUser = jest.fn();

      wrapper.find('form').simulate('submit', { preventDefault() {} });

      expect(wrapperInst.postUser).toHaveBeenCalled(); 
    });

    it.skip('calls alert if password has not been verified', () => {
      window.alert = jest.fn();
      wrapper.verifyPassword = jest.fn().mockImplementation(() => false);

      wrapper.find('form').simulate('submit', { preventDefault() {} });

      expect(window.alert).toHaveBeenCalled(); 
    });

  });

  describe('mapDispatchToProps', () => {
    
    it('returns an object with a updateCurrentUser function', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);

      expect(typeof result.updateCurrentUser).toEqual('function');
    });
  });

  describe('verifyEmail', () => {
    let mockUserData;
    let url;

    beforeEach( () => {
      url = 'http://localhost:3000/api/users';
    
      mockUserData = {
        "status": "success",
        "data": [{
          "id": 1,
          "name": "Taylor",
          "password": "password",
          "email": "tman2272@aol.com"
        },
        {
          "id": 2,
          "name": "daniela",
          "password": "hi",
          "email": "d@g.com"
        }
        ],
        "message": "Retrieved All Users"
      };

      window.fetch = jest.fn().mockImplementation( () => Promise.resolve( {
        status: 200,
        json: () => Promise.resolve(mockUserData)
      } ));
    });


    it('calls fetch with the correct arguments', () => {
      wrapper.instance().verifyEmail();
      expect(window.fetch).toHaveBeenCalledWith(url);
    });

    it('returns true if the user\'s email is not yet taken', async () => {
      wrapper.setState({ email: 'foolsgold@gmail.com' });

      const result =  await wrapper.instance().verifyEmail();

      expect(result).toEqual(true);
    });

    it('return false if the user\'s email is taken', async () => {
      wrapper.setState({ email: 'tman2272@aol.com' });

      const result =  await wrapper.instance().verifyEmail();

      expect(result).toEqual(false);
    });

    it('throws an error if the status is not ok', () => {
      window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
        status: 500
      }));

      const result = wrapper.instance().verifyEmail();
      const expected = Error('Error: 500')

      expect(result).rejects.toEqual(expected);
    });

    it('throws an error if the fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(
        'Fetch Failed' ));

      const result = wrapper.instance().verifyEmail();
      const expected = Error('Fetch Failed'); 

      expect(result).rejects.toEqual(expected);
    });

  });
  
});






















