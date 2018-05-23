import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateCurrentUser } from '../../actions';
import { connect } from 'react-redux';
import { fetchUsers, postUser } from '../../apiCalls';
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const newUserData = { name, email, password };
    const verifiedPassword = this.verifyPassword();
    const verifiedEmail = await this.verifyEmail();

    if (verifiedPassword && verifiedEmail) {
      const userId = await postUser(newUserData);
      this.props.updateCurrentUser(userId);
      this.setState({ authenticated: true });
    }
  };

  render() {
    if (this.state.authenticated) {
      return <Redirect to='/' />;
    };

    return ( 
      <div className='signup'>
        <form onSubmit={ this.handleSubmit } >
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
      </div>
    );
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (id) => dispatch(updateCurrentUser(id))
  };
};

SignUp.propTypes = {
  updateCurrentUser: PropTypes.func
}

export {
  SignUp,
  mapDispatchToProps
};

export default connect(null, mapDispatchToProps)(SignUp);



