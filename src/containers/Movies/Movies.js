import React from 'react';

const Movies = ({ movies }) => {

  return (
    <div>
      Movies
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies
})

export {
  Movies,
  mapStateToProps
};
