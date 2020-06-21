import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';
import Main from '../main/main.jsx';

const smallMovieCardTitleHandler = () => {};

const App = (props) => {
  const {films, moviePoster} = props;

  return (
    <Main
      films = {films}
      moviePoster = {moviePoster}
      onSmallMovieCardTitleClick = {smallMovieCardTitleHandler}
    />
  );
};

export default App;

App.propTypes = {
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  moviePoster: CustomPropTypes.MOVIE_POSTER,
};
