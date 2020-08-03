import * as React from 'react';

interface Props {
  isPlaying: boolean;
  muted: boolean;
  poster: string;
  src: string;
}

class VideoPlayer extends React.PureComponent<Props> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {muted} = this.props;
    const video = this.videoRef.current;

    video.muted = muted;
  }

  componentDidUpdate() {
    const {src} = this.props;
    const video = this.videoRef.current;

    video.src = src;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    video.src = ``;
    video.muted = null;
    video.onplay = null;
  }

  render() {
    const {poster} = this.props;

    return (
      <video width="280" height="175"
        poster={poster}
        ref={this.videoRef}
      >your browser doesn`t support embedded videos</video>
    );
  }
}

export default VideoPlayer;
