import * as React from 'react';
import {Film} from '../custom-types';

import {Pages} from '../../const';

interface Props {
  children: React.ReactNode;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  history: any;
  leftTime: string;
  onIsPlayingChange: () => void;
  onSetFullScreen: () => void;
  selectedFilm: Film;
}

const VideoPlayerFull: React.FC<Props> = (props: Props) => {
  const {
    children,
    currentTime,
    duration,
    isPlaying,
    history,
    leftTime,
    onIsPlayingChange,
    onSetFullScreen,
    selectedFilm,
  } = props;

  const playerToggler = ((currentTime * 100) / duration) + `%`;

  const btnIsPlaying = isPlaying ?
    <React.Fragment>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </React.Fragment> :
    <React.Fragment>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </React.Fragment>;

  return (
    <div className="player">
      {children}

      <button type="button" className="player__exit"
        onClick={() => history.push(`${Pages.FILM}/${selectedFilm.id}`)}
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={duration}></progress>
            <div className="player__toggler" style={{left: playerToggler}}>Toggler</div>
          </div>
          <div className="player__time-value">{leftTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={() => onIsPlayingChange()}
          >
            {btnIsPlaying}
          </button>
          <div className="player__name">{selectedFilm.title}</div>

          <button type="button" className="player__full-screen"
            onClick={() => onSetFullScreen()}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerFull;
