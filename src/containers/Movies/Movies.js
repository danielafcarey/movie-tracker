import React from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card/Card';
// import { withRouter } from 'react-router-dom';

const Movies = ({ movies }) => {
  const movieCards = movies.map(movie => {
   return <Card 
    {...movie}
    key={movie.id}
    />
  })

  return (
    <div>
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

export default connect(mapStateToProps)(Movies)