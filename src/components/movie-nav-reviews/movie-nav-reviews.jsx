import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {Operations as DataOperations} from '../../reducer/data/data.js';
import {getCommetsStatus, getFilmComments} from '../../reducer/data/selectors.js';
import MovieReview from '../movie-review/movie-review.jsx';

class MovieNavReviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadComments, selectedFilm} = this.props;
    loadComments(selectedFilm);
  }

  componentDidUpdate(nextProps) {
    const {loadComments, selectedFilm} = this.props;

    if (nextProps.selectedFilm !== selectedFilm) {
      loadComments(selectedFilm);
    }
  }

  render() {
    const {comments, loadingComments} = this.props;

    const isLoadingComments = () => {
      if (loadingComments.commentsIsLoading && !loadingComments.loadingIsError) {
        return `reviews is loading...`;
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
  }
}

MovieNavReviews.propTypes = {
  comments: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.COMMENT),
    PropTypes.bool,
  ]),
  loadComments: PropTypes.func.isRequired,
  loadingComments: PropTypes.shape({
    commentsIsLoading: PropTypes.bool.isRequired,
    loadingIsError: PropTypes.bool.isRequired,
  }),
  selectedFilm: PropTypes.oneOfType([
    CustomPropTypes.FILM,
    PropTypes.bool,
  ]),
};

const mapStateToProps = (state) => ({
  comments: getFilmComments(state),
  loadingComments: getCommetsStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(film) {
    dispatch(DataOperations.loadComments(film.id));
  },
});

export {MovieNavReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MovieNavReviews);
