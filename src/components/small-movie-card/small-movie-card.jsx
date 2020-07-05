import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import VideoPlayer from '../video-player/video-player.jsx';

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    const {film, onSmallMovieCardClick, isPlaying, setIsPlaying} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={() => onSmallMovieCardClick(film)}
        onMouseEnter={() => {
          this._timeout = setTimeout(() => setIsPlaying(true), 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this._timeout);
          setIsPlaying(false);
        }}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            muted
            isPlaying={isPlaying}
            src={film.src}
            poster={film.poster}
          />
        </div>
        <h3
          className="small-movie-card__title"
        >
          <a className="small-movie-card__link" href="movie-page"
            onClick={(evt) => evt.preventDefault()}
          >{film.title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  film: CustomPropTypes.FILM,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};

export default SmallMovieCard;
