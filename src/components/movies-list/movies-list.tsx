import * as React from 'react';
import {Films} from '../custom-types';

import SmallMovieCard from '../small-movie-card/small-movie-card';
import withVideo from '../../hoc/with-video/with-video';

const SmallMovieCardWrapped = withVideo(SmallMovieCard);

interface Props {
  films: Films;
}

const MoviesList = (props: Props) => {
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

export default React.memo(MoviesList);
