import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

const SmallMovieCard = (props) => {
  const {film, onMouseHover, onSmallMovieCardClick} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onClick = {() => onSmallMovieCardClick(film)}
      onMouseEnter = {() => onMouseHover(film)}
    >
      <div className="small-movie-card__image">
        <img src={film.preview} alt={film.title} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
      >
        <a className="small-movie-card__link" href="movie-page"
          onClick = {(evt) => evt.preventDefault()}
        >{film.title}</a>
      </h3>
    </article>
  );
};

export default SmallMovieCard;

SmallMovieCard.propTypes = {
  film: CustomPropTypes.FILM,
  onMouseHover: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};
