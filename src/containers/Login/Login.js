import React, { Component } from 'react';
import { fetchUsers, fetchFavorites } from '../../apiCalls';
import { updateCurrentUser, updateFavorites } from '../../actions';
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      id: null
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
    if (userMatch) {
      this.setState({ id: userMatch.id })
      return userMatch.id
    } else {
      return undefined;
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const userId = this.verifyUser();
    if (userId) {
      this.props.updateCurrentUser(userId);
      const favorites = await fetchFavorites(userId)
    } else {
      alert('User Does Not Exist')
    }
  }

  render() {
    return(
      <form
        type='submit'
        onSubmit={this.handleSubmit}
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

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (id) => dispatch(updateCurrentUser(id)),
  updateFavorites: (favorites) => dispatch(updateFavorites(favorites)),
})

export {
  Login,
  mapDispatchToProps
};

export default connect(null, mapDispatchToProps)(Login)