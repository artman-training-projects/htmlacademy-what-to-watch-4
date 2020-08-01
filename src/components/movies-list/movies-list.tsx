import * as React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types';

import SmallMovieCard from '../small-movie-card/small-movie-card';
import withVideo from '../../hoc/with-video/with-video';

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
