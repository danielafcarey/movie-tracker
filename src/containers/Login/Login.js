import React, { Component } from 'react';
import { fetchUsers } from '../../apiCalls'

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  verifyUser = async () => {
    const { email, password } = this.state;
    const users = await fetchUsers();
    const userMatch = users.find(user => {
      if(user.password === password && user.email === email) {
        return user
      }
    })
    return userMatch ? userMatch.id : undefined
  }

  render() {
    return(
      <form
        type='submit'
      >
        <input 
          type='text'
          placeholder='Email'
          name='email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}          
        />
        <button>Log In</button>
      </form>
    )
  }
}
export {
  Login
};