import * as React from 'react';
import {connect} from 'react-redux';
import {Comments, Film} from '../custom-types';

import {Operations as DataOperations} from '../../reducer/data/data';
import {getCommetsStatus, getFilmComments} from '../../reducer/data/selectors';
import MovieReview from '../movie-review/movie-review';

const COLUMNS = 2;

interface Props {
  comments: Comments;
  loadComments: (film: Film) => void;
  loadingComments: {
    commentsIsLoading: boolean;
    loadingIsError: boolean;
  };
  selectedFilm?: Film;
}

class MovieNavReviews extends React.PureComponent<Props> {
  constructor(props: Props) {
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

  _getColumnsMarkup() {
    const {comments} = this.props;

    const comentsOnColumn = comments && Math.ceil(comments.length / COLUMNS);
    const getCurrentComments = (start, end) => comments && comments.slice(start, end);
    const getColumnsWithComents = () => {
      const columnWithComments = [];

      for (let i = 0; i < COLUMNS; i++) {
        columnWithComments.push(getCurrentComments(i * comentsOnColumn, (i + 1) * comentsOnColumn));
      }

      return columnWithComments;
    };

    return getColumnsWithComents().map((column, i) => {
      return (<React.Fragment key={`${column} - ${i}`}>
        <div className="movie-card__reviews-col">
          {column && column.map((comment) => (
            <MovieReview
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      </React.Fragment>);
    });
  }

  render() {
    const {loadingComments} = this.props;

    const isLoadingComments = () => {
      if (loadingComments.commentsIsLoading && !loadingComments.loadingIsError) {
        return `reviews is loading...`;
      }

      if (loadingComments.commentsIsLoading && loadingComments.loadingIsError) {
        return `server error, try later...`;
      }

      return false;
    };

    return (<React.Fragment>
      <div className="movie-card__reviews movie-card__row">
        {isLoadingComments() || this._getColumnsMarkup()}
      </div>
    </React.Fragment>);
  }
}

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
