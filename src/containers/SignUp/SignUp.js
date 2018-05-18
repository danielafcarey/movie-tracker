import React, { Component } from 'react';
import { 
  updateCurrentUser
} from '../../actions';
import { connect } from 'react-redux';

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

  handleSubmit = (event) => {
    event.preventDefault();
    const verified = this.verifyPassword();
    const userId = Date.now();
    this.props.updateCurrentUser(userId);
    // this.postUser(userId)
  }

  render() {
    return (
      <form
        onSubmit={ this.handleSubmit } 
      >
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (id) => dispatch(updateCurrentUser(id))
  }
}


export {
  SignUp,
  mapDispatchToProps
};

export default connect(null, mapDispatchToProps)(SignUp);


