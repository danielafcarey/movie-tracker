import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { updateCurrentUser, updateFavorites} from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props)
  }
  
  handleClick = () => {
    this.props.updateCurrentUser(null);
    this.props.updateFavorites([])
  }

  render() {
    return (
      <header>
        <h1 className='title'>MovieTracker and Chill</h1>
        <div className='nav-bar'>
          <NavLink to='/'>Movies</NavLink>
          <NavLink to='/favorites'>Favorites</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
          <NavLink to='/login'>Log In</NavLink>
          <Link to='/' onClick={this.handleClick}>Log Out</Link>
        </div>
      </header>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (id) => dispatch(updateCurrentUser(id)),
  updateFavorites: (favorites) => dispatch(updateFavorites(favorites))
})

export {
  Header,
  mapDispatchToProps
};

export default Header;