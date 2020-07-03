import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {src, muted} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.muted = muted;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.muted = null;
    video.onplay = null;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  render() {
    const {poster} = this.props;

    return (
      <video width="280" height="175"
        type="video/webm"
        poster={poster}
        ref={this._videoRef}
      >your browser doesn`t support embedded videos</video>
    );
  }
}

VideoPlayer.propTypes = {
  muted: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
