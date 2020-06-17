import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const MoviesList = (props) => {
  const {films, onSmallMovieCardTitleClick} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <SmallMovieCard
          film = {film}
          key = {film.title}
          onSmallMovieCardTitleClick = {onSmallMovieCardTitleClick}
        />
      ))}
    </div>
  );
};

export default MoviesList;

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  })).isRequired,
  onSmallMovieCardTitleClick: PropTypes.func.isRequired,
};
