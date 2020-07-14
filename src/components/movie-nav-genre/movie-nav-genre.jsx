import React from 'react';
import PropTypes from 'prop-types';

const MAX_VISIBLE_GENRES = 10;

const MovieNavGenre = (props) => {
  const {currentGenre, genres, onGenreClick, onResetShowClick} = props;
  const visibleGenres = genres.slice(0, MAX_VISIBLE_GENRES);

  return (
    <ul className="catalog__genres-list">
      {visibleGenres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre);
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
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onResetShowClick: PropTypes.func.isRequired,
};

export default React.memo(MovieNavGenre);
