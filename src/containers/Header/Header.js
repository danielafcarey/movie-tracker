import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <header>
      <NavLink to='/'>Movies</NavLink>
      <NavLink to='/favorites'>Favorites</NavLink>
      <NavLink to='/login'>LogIn</NavLink>
      <NavLink to='/signup'>SignUp</NavLink>
    </header>
  );
};

export {
  Header
};

export default Header;