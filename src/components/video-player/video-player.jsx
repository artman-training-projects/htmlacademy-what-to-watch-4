import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const {poster, preview} = props;

  return (
    <video width="280" height="175"
      type="video/webm"
      src={preview}
      poster={poster}
    >your browser doesn`t support embedded videos</video>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};
