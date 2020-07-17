import PropTypes from 'prop-types';

export const CustomPropTypes = {
  FILM: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    previewImg: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    // previewSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    time: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    // isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  COMMENT: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })
};
