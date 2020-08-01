import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import withVideo from '../../hoc/with-video/with-video.jsx';

const SmallMovieCardWrapped = withVideo(SmallMovieCard);

const MoviesList = (props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <SmallMovieCardWrapped
          key={film.id}
          film={film}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
};

export default React.memo(MoviesList);
