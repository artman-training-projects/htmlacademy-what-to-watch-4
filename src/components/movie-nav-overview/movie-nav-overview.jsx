import React from 'react';
import PropTypes from 'prop-types';

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

const MovieNavOverview = (props) => {
  const {rating, votes, description, director, starring} = props;

  return (<React.Fragment>
    <div className="movie-rating">
      <div className="movie-rating__score">{rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{getRating(rating)}</span>
        <span className="movie-rating__count">{votes} ratings</span>
      </p>
    </div>

    <div className="movie-card__text">
      <p>{description}</p>

      <p className="movie-card__director">
        <strong>Director: {director}</strong>
      </p>
      <p className="movie-card__starring">
        <strong>Starring: {starring.map((star) => star).join(`, `)} and other</strong>
      </p>
    </div>
  </React.Fragment>);
};

export default MovieNavOverview;

MovieNavOverview.propTypes = {
  rating: PropTypes.string.isRequired,
  votes: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
