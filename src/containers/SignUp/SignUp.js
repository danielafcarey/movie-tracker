import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      verification: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    
    this.setState({ [name]: value })
  }

  verifyPassword = () => this.state.password === this.state.verification;

  postUser = () => {
    const { email, password } = this.state;
    const newUserData = { email, password };
    const url = 'http://localhost:3000/api/users/new';
    const optionsObject = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserData)
    }
    fetch(url, optionsObject) 
  }

  handleSubmit = () => {
    // const userId = 
    //
  }

  render() {
    return (
      <form>
        <input 
          type='text'
          value={ this.state.name }
          name='name'
          placeholder='Name'
          onChange={ this.handleChange }
        />
        <input 
          type='text'
          value={ this.state.email }
          name='email'
          placeholder='Email'
          onChange={ this.handleChange }
        />
        <input 
          type='text'
          value={ this.state.password }
          name='password'
          placeholder='Password'
          onChange={ this.handleChange }
        />
        <input 
          type='text'
          value={ this.state.verification }
          name='verification'
          placeholder='Retype password'
          onChange={ this.handleChange }
        />
        <button>Sign up</button>
      </form>
    );

  }
};

export {
  SignUp
};


// render a form with 4 inputs and a submit button: name, email, password, password verification
// dispatch: addUser (add to store....not to backend)
// state for onChange of input
// verify password inputs
// handleSubmit
// handleChange
// fetch(POST) - from the apiCalls.js
//
// onSubmit: 
// - verify passwords
// - fetch(POST) new user to backend
// - send user object to store
