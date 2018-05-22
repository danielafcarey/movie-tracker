import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateMovies } from '../../actions'; 
import { fetchMovies } from '../../apiCalls'; 
import { cleanMovieData } from '../../cleaner';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

import Movies from '../Movies/Movies';
import Favorites from '../Favorites/Favorites';  
import Login from '../Login/Login'; 
import SignUp from '../SignUp/SignUp'; 
import Header from '../Header/Header'; 

class App extends Component { 

  async componentDidMount() { 
    const movieData = await fetchMovies(); 
    const cleanedMovies = cleanMovieData(movieData.results); 
    this.props.populateMovies(cleanedMovies); 
  } 
  
  render() { 
    return (
      <div className='App'>
        <Header /> 
        <Switch>
          <Route exact path='/' component={ Movies }/>
          <Route exact path='/favorites' component={ Favorites }/>
          <Route exact path='/login' component={ Login }/>
          <Route exact path='/signup' component={ SignUp }/> 
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    populateMovies: (movies) => dispatch(populateMovies(movies))
  }
}

App.propTypes = {
  populateMovies: PropTypes.func,
}

export {
  App,
  mapDispatchToProps
}

export default withRouter(connect(null, mapDispatchToProps)(App));
