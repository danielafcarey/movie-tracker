import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { 
  populateMovies
} from '../../actions';
import { fetchMovies } from '../../apiCalls';
import { cleanMovieData } from '../../cleaner'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const movieData = await fetchMovies();
    const cleanedMovies = cleanMovieData(movieData.results);
    this.props.populateMovies(cleanedMovies);
  }

  render() {
    return (
      <div className="App">
        REACT YO FACE!
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    populateMovies: (movies) => dispatch(populateMovies(movies))
  }
}

export {
  App,
  mapStateToProps,
  mapDispatchToProps
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
