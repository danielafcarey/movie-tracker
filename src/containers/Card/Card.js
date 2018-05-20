import React from 'react';
import { connect } from 'react-redux';
import * as apiCalls from '../../apiCalls';

const Card = (props) => {
  const {
    movieId,
    title,
    rating,
    image,
    releaseDate,
    favorite,
  } = props;

  return(
    <div className='card'>
      <img src={image} />
      <h2>{title}</h2>
      <h3>Rating: {rating}</h3>
      <h3>Release Date: {releaseDate}</h3>
      <button>Favorite</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.currentUser  
})

const mapDispatchToProps = (dispatch) => ({

})

export {
  Card,
  mapStateToProps,
  mapDispatchToProps
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
