import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {getCommetsStatus, getFilmComments} from '../../reducer/data/selectors.js';
import MovieReview from '../movie-review/movie-review.jsx';

const MovieNavReviews = (props) => {
  const {comments, loadingComments} = props;

  const isLoadingComments = () => {
    if (loadingComments.commentsIsLoading && !loadingComments.loadingIsError) {
      return `films is loading...`;
    } else if (loadingComments.commentsIsLoading && loadingComments.loadingIsError) {
      return `server error, try later...`;
    }

    return false;
  };

  const halfComments = comments && Math.ceil(comments.length / 2);
  const commentsColumn1 = comments && comments.slice(0, halfComments);
  const commentsColumn2 = comments && comments.slice(halfComments);

  return (<React.Fragment>
    <div className="movie-card__reviews movie-card__row">
      {isLoadingComments() ||
        <React.Fragment>
          <div className="movie-card__reviews-col">
            {comments && commentsColumn1.map((comment) => (
              <MovieReview
                key={comment.id}
                comment={comment}
              />
            ))}
          </div>

          <div className="movie-card__reviews-col">
            {comments && commentsColumn2.map((comment) => (
              <MovieReview
                key={comment.id}
                comment={comment}
              />
            ))}
          </div>
        </React.Fragment>
      }
    </div>
  </React.Fragment>);
};

MovieNavReviews.propTypes = {
  comments: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.COMMENT),
    PropTypes.bool,
  ]),
  loadingComments: PropTypes.shape({
    commentsIsLoading: PropTypes.bool.isRequired,
    loadingIsError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  comments: getFilmComments(state),
  loadingComments: getCommetsStatus(state),
});

export default connect(mapStateToProps)(MovieNavReviews);
