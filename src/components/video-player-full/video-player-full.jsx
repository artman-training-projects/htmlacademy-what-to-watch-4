import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';
import {getCurrentPage} from '../../reducer/app/selectors.js';

const VideoPlayerFull = (props) => {
  const {
    children,
    currentTime,
    duration,
    film,
    isPlaying,
    leftTime,
    onClosePlayerClick,
    onIsPlayingChange,
    onSetFullScreen,
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
        onClick={() => onClosePlayerClick()}
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
          <div className="player__name">{film.title}</div>

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

VideoPlayerFull.propTypes = {
  children: PropTypes.element.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  film: CustomPropTypes.FILM,
  isPlaying: PropTypes.bool.isRequired,
  leftTime: PropTypes.string.isRequired,
  onClosePlayerClick: PropTypes.func.isRequired,
  onIsPlayingChange: PropTypes.func.isRequired,
  onSetFullScreen: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  currentPage: getCurrentPage(state),
});

export default connect(mapStateToProps)(VideoPlayerFull);
