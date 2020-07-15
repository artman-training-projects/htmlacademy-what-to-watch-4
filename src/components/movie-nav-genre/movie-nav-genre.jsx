import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

const MAX_VISIBLE_GENRES = 10;

const MovieNavGenre = (props) => {
  const {currentGenre, films, genres, onGenreClick, onResetShowClick} = props;
  const visibleGenres = genres.slice(0, MAX_VISIBLE_GENRES);

  return (
    <ul className="catalog__genres-list">
      {visibleGenres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre, films);
            onResetShowClick();
          }}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

MovieNavGenre.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onResetShowClick: PropTypes.func.isRequired,
};

export default React.memo(MovieNavGenre);
