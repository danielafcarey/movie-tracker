import React, { Component } from 'react';
import { updateCurrentUser } from '../../actions';
import { connect } from 'react-redux';
import { fetchUsers } from '../../apiCalls';
import { Redirect } from 'react-router';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      verification: '',
      emailError: '',
      passwordError: '',
      authenticated: false
    };
  };

  handleChange = (event) => {
    const {
      name,
      value
    } = event.target;
    const newValue = value.toLowerCase();

    this.setState({ [name]: newValue });
  };

  verifyPassword = () => {
    if (this.state.password === this.state.verification) {
      this.setState({ passwordError: '' }); 
      return true;
    } else {
      this.setState({ passwordError: 'Passwords must match' });
      return false;
    }
  };

  verifyEmail = async () => {
    const users = await fetchUsers();
    const emailMatch = users.find(user => user.email === this.state.email);

    if (emailMatch) {
      this.setState({ emailError: 'Email has already been used' });
      return false;
    } else {
      this.setState({ emailError: '' });
      return true;
    }
  };

  postUser = async () => {
    const { name, email, password } = this.state;
    const newUserData = { name, email, password };
    const url = 'http://localhost:3000/api/users/new';
    const optionsObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserData)
    };

    try {
      const response = await fetch(url, optionsObject);
      const data = await response.json();
      return data.id;
    } catch (error) {
      throw Error(error);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const verifiedPassword = this.verifyPassword();
    const verifiedEmail = await this.verifyEmail();

    if (verifiedPassword && verifiedEmail) {
      const userId = await this.postUser();
      this.props.updateCurrentUser(userId);
      this.setState({ authenticated: true });
    }
  };

  render() {
    if (this.state.authenticated) {
      return <Redirect to='/' />;
    };

    return ( 
      <form onSubmit={ this.handleSubmit }>
        <input 
          type='text'
          value={ this.state.name }
          name='name'
          placeholder='Name*'
          onChange={ this.handleChange }
          required
        /> 
        <input 
          type='text'
          value={ this.state.email }
          name='email'
          placeholder='Email*'
          onChange={ this.handleChange }
          required
        /> 
        <p>{ this.state.emailError }</p>
        <input 
          type='password'
          value={ this.state.password }
          name='password'
          placeholder='Password*'
          onChange={ this.handleChange }
          required
        /> 
        <input 
          type='password'
          value={ this.state.verification }
          name='verification'
          placeholder='Retype password*'
          onChange={ this.handleChange }
          required
        /> 
        <p>{ this.state.passwordError }</p>
        <button>Sign Up</button> 
      </form >
    );
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (id) => dispatch(updateCurrentUser(id))
  };
};

export {
  SignUp,
  mapDispatchToProps
};

export default connect(null, mapDispatchToProps)(SignUp);



