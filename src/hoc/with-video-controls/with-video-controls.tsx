import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {Film} from '../../components/custom-types';

import {Time} from '../../const';
import {getFilmById} from '../../reducer/data/selectors';

interface Props {
  selectedFilm: Film;
}

interface State {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

interface InjectedProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  leftTime: number;
  onIsPlayingChange: () => void;
  onSetFullScreen: () => void;
}

const withVideoControls = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithVideoControls extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props: Props) {
      super(props);

      this.state = {
        currentTime: 0,
        duration: 0,
        isPlaying: true,
      };

      this.videoRef = React.createRef();

      this._handleIsPlayingChange = this._handleIsPlayingChange.bind(this);
      this._handleSetFullScreen = this._handleSetFullScreen.bind(this);
    }

    componentDidMount() {
      const {selectedFilm} = this.props;
      const video = this.videoRef.current;

      video.src = selectedFilm.src;
      video.play();

      video.onloadedmetadata = () => this.setState({
        duration: video.duration,
      });

      video.ontimeupdate = () => this.setState({
        currentTime: Math.trunc(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

      if (document.fullscreenElement === null) {
        video.controls = false;
      }

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.src = ``;
      video.onplay = null;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
      video.controls = null;
    }

    _handleIsPlayingChange() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    _handleSetFullScreen() {
      const video = this.videoRef.current;
      video.requestFullscreen();
      video.controls = true;
    }

    _leftTime() {
      const {currentTime, duration} = this.state;

      const timeDiff = duration - currentTime;

      const seconds = Math.trunc(timeDiff % Time.SECONDS_IN_MINUTE);
      const minutes = Math.trunc(timeDiff / Time.SECONDS_IN_MINUTE);
      const hours = Math.trunc(minutes / Time.MINUTES_IN_HOUR);

      return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
    }

    render() {
      const {currentTime, duration, isPlaying} = this.state;
      const {selectedFilm} = this.props;
      const leftTime = this._leftTime();

      return <Component
        {...this.props}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        leftTime={leftTime}
        onIsPlayingChange={this._handleIsPlayingChange}
        onSetFullScreen={this._handleSetFullScreen}
      >
        <video className="player__video"
          poster={selectedFilm.bg}
          ref={this.videoRef}
        >your browser doesn`t support embedded videos</video>
      </Component>;
    }
  }

  const mapStateToProps = (state, props) => ({
    selectedFilm: getFilmById(state, props.selectedID),
  });

  return connect(mapStateToProps)(WithVideoControls);
};

export default withVideoControls;
