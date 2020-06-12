import React from 'react';
import MovieItem from './movie-item.jsx';

const MovieList = (props) => {
  // eslint-disable-next-line react/prop-types
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
