import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as apiCalls from '../../apiCalls';
import { addFavorite } from '../../actions';

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

    // if this.props.favorite === false
    apiCalls.postFavorite(this.props.userId, movieToPost);
    this.props.addFavorite(movieToStore); 

    //else if this.props.favorite === true
    //apiCalls.deleteFavorite(userId, movieId)
    //this.props.removeFavorite(movie)
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
  addFavorite: (favoriteMovie) => dispatch(addFavorite(favoriteMovie))
})

export {
  Card,
  mapStateToProps,
  mapDispatchToProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);


