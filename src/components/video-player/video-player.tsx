import * as React from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {muted} = this.props;
    const video = this._videoRef.current;

    video.muted = muted;
  }

  componentDidUpdate() {
    const {src} = this.props;
    const video = this._videoRef.current;

    video.src = src;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.muted = null;
    video.onplay = null;
  }

  render() {
    const {poster} = this.props;

    return (
      <video width="280" height="175"
        poster={poster}
        ref={this._videoRef}
      >your browser doesn`t support embedded videos</video>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default VideoPlayer;
