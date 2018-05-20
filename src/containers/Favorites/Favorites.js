import React from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Favorites = (props) => {
  if (!props.favorites) {
    return <div>Get a job!</div>
  }
  const favoriteCards = props.favorites.map(favorite => {
    return <Card { ...favorite } key={ favorite.movieId } />
  }) 

  return (
    <div className='favorites-container'>
      { favoriteCards } 
    </div>
  )
}

const mapStateToProps = (state) => ({
  favorites: state.favorites
})

export {
  Favorites,
  mapStateToProps
}

export default connect(mapStateToProps)(Favorites);
