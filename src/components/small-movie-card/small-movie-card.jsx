import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import VideoPlayer from '../video-player/video-player.jsx';
import {Pages} from '../../const.js';

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    const {film, isPlaying, onIsPlayingChange, onSmallMovieCardClick} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          this._timeout = setTimeout(() => onIsPlayingChange(true), 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this._timeout);
          onIsPlayingChange(false);
        }}
        onClick={() => onSmallMovieCardClick(film)}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            muted
            isPlaying={isPlaying}
            src={film.previewSrc}
            poster={film.previewImg}
          />
        </div>
        <h3
          className="small-movie-card__title"
        >
          <Link to={`${Pages.FILM}/${film.id}`} className="small-movie-card__link">{film.title}</Link>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  film: CustomPropTypes.FILM,
  isPlaying: PropTypes.bool.isRequired,
  onIsPlayingChange: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
