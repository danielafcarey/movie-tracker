import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as apiCalls from '../../apiCalls';
import { 
  addFavoriteToFavorites, 
  deleteFavoriteFromFavorites 
} from '../../actions';

class Card extends Component {
  constructor(props) {
    super(props)
  }
 
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
    }

    if (this.props.favorite === false) {
      apiCalls.postFavorite(this.props.userId, movieToPost);
      this.props.addFavoriteToFavorites(movieToStore); 
      // this.props.addFavoritesToMovies(movieToStore);
    } else {
      apiCalls.deleteFavorite(this.props.userId, this.props.movieId);
      this.props.deleteFavoriteFromFavorites(this.props.movieId);
      //this.props.deleteFavoritesFromMovies(this.props.movieId);
    }
  }

  render() {
    const {
      movieId,
      title,
      rating,
      image,
      releaseDate,
      favorite,
    } = this.props

    return(
      <div className='card'>
        <img src={image} />
        <h2>{title}</h2>
        <h3>Rating: {rating}</h3>
        <h3>Release Date: {releaseDate}</h3>
        <button onClick={ this.handleClick }>Favorite</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.currentUser  
})

const mapDispatchToProps = (dispatch) => ({
  addFavoriteToFavorites: (favoriteMovie) => dispatch(addFavoriteToFavorites(favoriteMovie)),
  deleteFavoriteFromFavorites: (movieId) => dispatch(deleteFavoriteFromFavorites(movieId))
})

export {
  Card,
  mapStateToProps,
  mapDispatchToProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);


