import React from 'react';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';

const smallMovieCardTitleHandler = () => {};

const App = (props) => {
  const {movieTitle, movieGenre, movieYear, films} = props;

  return (
    <Main
      movieTitle = {movieTitle}
      movieGenre = {movieGenre}
      movieYear = {movieYear}
      films = {films}
      onSmallMovieCardTitleClick = {smallMovieCardTitleHandler}
    />
  );
};

export default App;

App.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieYear: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(PropTypes.string),
};
