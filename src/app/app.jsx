import React from 'react';
import PropTypes from 'prop-types';

import Main from '../components/main.jsx';

const App = (props) => {
  const {movieTitle, movieGenre, movieYear} = props;
  const {films} = props;

  return (
    <Main
      {...{movieTitle, movieGenre, movieYear, films}}
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
