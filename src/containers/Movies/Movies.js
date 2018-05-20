import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '../Card/Card';

const Movies = ({ movies }) => {
  const movieCards = movies.map(movie => {
   return <Card 
    {...movie}
    key={movie.id}
    />
  })

  return (
    <div className='movie-container'>
      {movieCards}
    </div>
  )
};

const mapStateToProps = (state) => ({
  movies: state.movies
});

export {
  Movies,
  mapStateToProps
};

export default connect(mapStateToProps)(Movies);
