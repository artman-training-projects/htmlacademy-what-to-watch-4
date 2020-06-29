import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import VideoPlayer from '../video-player/video-player.jsx';

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    const {film, onMouseHover, onSmallMovieCardClick} = this.props;
    const {isPlaying} = this.state;

    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={() => onSmallMovieCardClick(film)}
        onMouseEnter={() => {
          onMouseHover(film);
          this._timeout = setTimeout(() => this.setState({
            isPlaying: true
          }), 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this._timeout);
          this.setState({
            isPlaying: false
          });
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

export default SmallMovieCard;

SmallMovieCard.propTypes = {
  film: CustomPropTypes.FILM,
  onMouseHover: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};
