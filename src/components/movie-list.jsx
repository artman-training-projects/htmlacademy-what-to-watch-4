import React from 'react';
import PropTypes from 'prop-types';

import MovieItem from './movie-item.jsx';

const MovieList = (props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) =>
        <MovieItem
          key = {film}
          film = {film}
        />
      )}
    </div>
  );
};

export default MovieList;

MovieList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.string),
};
