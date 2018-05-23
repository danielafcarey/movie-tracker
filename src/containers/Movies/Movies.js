import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../Card/Card';

const Movies = ({ movies }) => {
  const movieCards = movies.map(movie => {
    return <Card 
      {...movie}
      key={movie.movieId}
    />;
  });

  return (
    <div className='movie-container'>
      {movieCards}
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies
});

Movies.propTypes = {
  movies: PropTypes.array
};

export {
  Movies,
  mapStateToProps
};

export default connect(mapStateToProps)(Movies);
