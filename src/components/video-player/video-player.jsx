import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const {src, poster} = props;

  return (
    <video width="280" height="175"
      type="video/webm"
      src={src}
      poster={poster}
    >your browser doesn`t support embedded videos</video>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};
