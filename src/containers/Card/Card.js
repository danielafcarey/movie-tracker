import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as apiCalls from '../../apiCalls';
import PropTypes from 'prop-types';
import { 
  addFavoriteToMovies, 
  deleteFavoriteFromMovies, 
  addFavoriteToFavorites, 
  deleteFavoriteFromFavorites 
} from '../../actions';

class Card extends Component {
  handleClick = () => {
    const movieToPost = {
      movie_id: this.props.movieId,
      title: this.props.title,
      vote_average: this.props.rating,
      poster_path: this.props.image,
      release_date: this.props.releaseDate,
    };
    const movieToStore = {
      movieId: this.props.movieId,
      title: this.props.title,
      rating: this.props.rating,
      image: this.props.image,
      releaseDate: this.props.releaseDate,
      favorite: this.props.favorite
    };

    if (!this.props.userId) {
     alert('Please sign in or create an account to add favorites');
     return;
    }
    
    if (this.props.favorite === false) {
      apiCalls.postFavorite(this.props.userId, movieToPost);
      this.props.addFavoriteToFavorites(movieToStore); 
      this.props.addFavoriteToMovies(movieToStore);
    } else {
      apiCalls.deleteFavorite(this.props.userId, this.props.movieId);
      this.props.deleteFavoriteFromFavorites(this.props.movieId);
      this.props.deleteFavoriteFromMovies(this.props.movieId);
    }
  };

  render() {
    const {
      title,
      rating,
      image,
      releaseDate,
      favorite
    } = this.props;

    let favoriteClass;
    favorite ? favoriteClass = 'favorite' : favoriteClass = '';

    return (
      <div className='card'>
        <img src={image} alt={`${title} poster`}/>
        <h2>{title}</h2>
        <h3>Rating: {rating}</h3>
        <h3>Release Date: {releaseDate}</h3>
        <button 
          className={ favoriteClass }
          onClick={ this.handleClick }>☆</button>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  userId: state.currentUser  
});

const mapDispatchToProps = (dispatch) => ({
  addFavoriteToMovies: (favoriteMovie) => dispatch(addFavoriteToMovies(favoriteMovie)),
  deleteFavoriteFromMovies: (movieId) => dispatch(deleteFavoriteFromMovies(movieId)),
  addFavoriteToFavorites: (favoriteMovie) => dispatch(addFavoriteToFavorites(favoriteMovie)),
  deleteFavoriteFromFavorites: (movieId) => dispatch(deleteFavoriteFromFavorites(movieId))
});

Card.propTypes = {
  movieId: PropTypes.number,
  title: PropTypes.string,
  rating: PropTypes.number,
  releaseDate: PropTypes.string,
  image: PropTypes.string,
  favorite: PropTypes.bool,
  addFavoriteToMovies: PropTypes.func, 
  deleteFavoriteFromMovies: PropTypes.func,
  addFavoriteToFavorites: PropTypes.func,
  deleteFavoriteFromFavorites: PropTypes.func,
  userId: PropTypes.number
}

export {
  Card,
  mapStateToProps,
  mapDispatchToProps,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);


