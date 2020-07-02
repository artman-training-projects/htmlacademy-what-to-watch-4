import React from 'react';
import PropTypes from 'prop-types';

const MAX_VISIBLE_GENRES = 10;

const MovieNavGenre = (props) => {
  const {genres, currentGenre, onGenreClick} = props;
  const visibleGenres = genres.slice(0, MAX_VISIBLE_GENRES);

  return (
    <ul className="catalog__genres-list">
      {visibleGenres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre);
          }}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

MovieNavGenre.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default MovieNavGenre;
