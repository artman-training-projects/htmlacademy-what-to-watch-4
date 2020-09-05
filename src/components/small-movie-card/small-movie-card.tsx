import * as React from 'react';
import {Film} from '../custom-types';

import {Pages} from '../../const';
import VideoPlayer from '../video-player/video-player';

interface Props {
  film?: Film;
  history: any;
  isPlaying: boolean;
  onIsPlayingChange: (arg: boolean) => void;
}

class SmallMovieCard extends React.PureComponent<Props> {
  private timeout: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);

    this.timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {film, history, isPlaying, onIsPlayingChange} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          this.timeout = setTimeout(() => onIsPlayingChange(true), 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this.timeout);
          onIsPlayingChange(false);
        }}
        onClick={() => {
          history.push(`${Pages.FILM}/${film.id}`);
        }}
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
          <a href={`${Pages.FILM}/${film.id}`} className="small-movie-card__link"
            onClick={(evt) => evt.preventDefault()}
          >{film.title}</a>
        </h3>
      </article>
    );
  }
}

export default SmallMovieCard;
