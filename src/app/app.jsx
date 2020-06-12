import React from 'react';
import PropTypes from 'prop-types';

import Main from '../components/main.jsx';

const App = (props) => {
  const {moviePoster, films} = props;

  return (
    <Main
      {...{moviePoster, films}}
    />
  );
};

export default App;

App.propTypes = {
  moviePoster: PropTypes.shape({
    TITLE: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    YEAR: PropTypes.string.isRequired,
  }),
  films: PropTypes.arrayOf(PropTypes.string),
};
