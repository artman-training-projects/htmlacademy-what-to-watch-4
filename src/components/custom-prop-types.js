import PropTypes from 'prop-types';

export const CustomPropTypes = {
  FILM: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  MOVIE_POSTER: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
};
