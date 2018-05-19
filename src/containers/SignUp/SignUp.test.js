import React from 'react';
import { shallow } from 'enzyme';
import { 
  SignUp,
  mapDispatchToProps
} from './SignUp';

describe('SignUp', () => {
  let wrapper;
  let mockUpdateCurrentUser;

  beforeEach(() => {
    mockUpdateCurrentUser = jest.fn()
    wrapper = shallow(<SignUp updateCurrentUser={mockUpdateCurrentUser}/>);
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
      
      it('calls alert if password has not been verified', async () => {
        const wrapperInst = wrapper.instance();
        wrapperInst.verifyPassword = jest.fn().mockImplementation(() => false);
        wrapperInst.verifyEmail = jest.fn().mockImplementation(() => true);
        window.alert = jest.fn();

        await wrapperInst.handleSubmit(mockEvent);

        expect(window.alert).toHaveBeenCalled();
      });

      it('calls alert if email is not verified', async () => {
        const wrapperInst = wrapper.instance();
        wrapperInst.verifyPassword = jest.fn().mockImplementation(() => true);
        wrapperInst.verifyEmail = jest.fn().mockImplementation(() => false);
        window.alert = jest.fn();

        await wrapperInst.handleSubmit(mockEvent);

        expect(window.alert).toHaveBeenCalled();
      })

      it('calls alert if both email and password are not verified', async () => {
        const wrapperInst = wrapper.instance();
        wrapperInst.verifyPassword = jest.fn().mockImplementation(() => false);
        wrapperInst.verifyEmail = jest.fn().mockImplementation(() => false);
        window.alert = jest.fn();

        await wrapperInst.handleSubmit(mockEvent);

        expect(window.alert).toHaveBeenCalled();
      })
       
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






















