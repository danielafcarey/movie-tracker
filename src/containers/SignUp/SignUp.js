import React, {
  Component
} from 'react';
import {
  updateCurrentUser
} from '../../actions';
import {
  connect
} from 'react-redux';
import { getUserId } from '../../helper'
import { fetchUsers } from '../../apiCalls'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      verification: ''
    };
  }

  handleChange = (event) => {
    const {
      name,
      value
    } = event.target;
    const newValue = value.toLowerCase();

    this.setState({
      [name]: newValue
    });
  }

  verifyPassword = () => this.state.password === this.state.verification;

  verifyEmail = async () => {
    const users = await fetchUsers();
    const emailMatch = users.find(user => user.email === this.state.email)
    if (emailMatch) {
      return false;
    } else {
      return true;
    }
  }

  postUser = async () => {
    const {
      name,
      email,
      password
    } = this.state;
    const newUserData = {
      name,
      email,
      password
    };
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
      return data.id
    } catch (error) {
      throw Error(error);
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const verifiedPassword = this.verifyPassword();
    const verifiedEmail = await this.verifyEmail();
    if (verifiedPassword && verifiedEmail) {
      const userId = await this.postUser();
      this.props.updateCurrentUser(userId);
    } else {
      alert('Check yo self');
    }
  }

  render() {
    return ( 
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text'
          value={this.state.name}
          name='name'
          placeholder='Name'
          onChange={this.handleChange}
        /> 
        <input 
          type='text'
          value={this.state.email}
          name='email'
          placeholder='Email'
          onChange={this.handleChange}
        /> 
        <input 
          type='password'
          value={this.state.password}
          name='password'
          placeholder='Password'
          onChange={this.handleChange}
        /> 
        <input 
          type='password'
          value={this.state.verification}
          name='verification'
          placeholder='Retype password'
          onChange={this.handleChange}
        /> 
        <button>Sign Up</button> 
      </form >
    );

  }
}

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