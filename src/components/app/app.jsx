import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import Main from '../main/main.jsx';
import MovieCard from '../movie-card/movie-card.jsx';

const smallMovieCardTitleHandler = () => {};

const App = (props) => {
  const {films, moviePoster} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Main
            moviePoster = {moviePoster}
            films = {films}
            onSmallMovieCardTitleClick = {smallMovieCardTitleHandler}
          />
        </Route>/
        <Route exact path='/movie-card'>
          <MovieCard

          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

App.propTypes = {
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  moviePoster: CustomPropTypes.MOVIE_POSTER,
};
