import React from 'react';
import PropTypes from 'prop-types';
import {Time} from '../../const.js';

const MovieNavDetails = (props) => {
  const {director, genre, starring, time, year} = props;

  const getHours = () => {
    const hours = Math.trunc(time / Time.MINUTES_IN_HOUR);
    return hours > 0 ? `${hours}h` : ``;
  };

  const getMinutes = () => {
    const minutes = time % Time.SECONDS_IN_MINUTE;
    return minutes > 0 ? `${minutes}m` : ``;
  };

  const runTime = `${getHours()} ${getMinutes()}`;

  return (<React.Fragment>
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {starring.map((star) => (
              star
            )).join(`, \n`)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{runTime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{year}</span>
        </p>
      </div>
    </div>
  </React.Fragment>);
};

MovieNavDetails.propTypes = {
  director: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  time: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default MovieNavDetails;
