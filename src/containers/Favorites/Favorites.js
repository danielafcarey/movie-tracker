import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import { connect } from 'react-redux';

const Favorites = (props) => {
  if (props.favorites.length === 0) {
    return (
      <div className='no-favorites'>
        Click Movies to browse and add favorites
      </div>
    );
  }

  const favoriteCards = props.favorites.map(favorite => {
    return <Card { ...favorite } key={ favorite.movieId } />;
  }); 

  return (
    <div className='movie-container'>
      { favoriteCards } 
    </div>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.favorites
});

Favorites.propTypes = {
  favorites: PropTypes.array
}

export {
  Favorites,
  mapStateToProps
};

export default connect(mapStateToProps)(Favorites);
