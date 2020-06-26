import React from 'react';
import {CustomPropTypes} from '../custom-prop-types.js';

const getRating = (rating) => {
  if (rating < 3) {
    return `Bad`;
  } else if (rating < 5) {
    return `Normal`;
  } else if (rating < 8) {
    return `Good`;
  } else if (rating < 10) {
    return `Very good`;
  } else {
    return `Awesome`;
  }
};

const MovieNavTabs = (props) => {
  const {film} = props;

  return (<React.Fragment>
    <div className="movie-rating">
      <div className="movie-rating__score">{film.rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{getRating(film.rating)}</span>
        <span className="movie-rating__count">{film.votes} ratings</span>
      </p>
    </div>

    <div className="movie-card__text">
      <p>{film.description}</p>

      <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
      <p className="movie-card__starring"><strong>Starring: {film.starring.map((star) => star).join(`, `)} and other</strong></p>
    </div>
  </React.Fragment>);
};

export default MovieNavTabs;

MovieNavTabs.propTypes = {
  film: CustomPropTypes.FILM,
};
