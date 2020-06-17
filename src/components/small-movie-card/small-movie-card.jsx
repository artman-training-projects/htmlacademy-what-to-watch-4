import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = (props) => {
  const {film, onSmallMovieCardTitleClick, onMouseOver} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver = {() => onMouseOver(film)}
    >
      <div className="small-movie-card__image">
        <img src={film.poster} alt={film.title} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
      >
        <a className="small-movie-card__link" href="movie-page.html"
          onClick = {(evt) => {
            evt.preventDefault();
            onSmallMovieCardTitleClick(film);
          }}
        >{film.title}</a>
      </h3>
    </article>
  );
};

export default SmallMovieCard;

SmallMovieCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onSmallMovieCardTitleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
