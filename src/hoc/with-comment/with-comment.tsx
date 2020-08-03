import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {Film} from '../../components/custom-types';
import {Operations as DataOperations} from '../../reducer/data/data';
import {getFilmById} from '../../reducer/data/selectors';

const BASE_RATING = `1`;

interface Props {
  handleSubmitReview: (number, {}) => void;
  loadFilms: () => void;
  selectedFilm: Film;
  sendingComment: {
    commentsIsSending: boolean;
    sendingIsError: boolean;
  };
}

interface State {
  rating: string;
  comment: string | boolean;
}

interface InjectedProps {
  comment: Comment;
  onChangeComment: () => void;
  onChangeRating: () => void;
  onSubmitReview: () => void;
  rating: string;
}

const withComment = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithComment extends React.PureComponent<T, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        rating: BASE_RATING,
        comment: false,
      };

      this._handleChangeComment = this._handleChangeComment.bind(this);
      this._handleChangeRating = this._handleChangeRating.bind(this);
      this._handleSubmitReview = this._handleSubmitReview.bind(this);
    }


    componentDidMount() {
      const {loadFilms} = this.props;
      loadFilms();
    }

    _handleChangeComment(evt) {
      const comment = evt.target.value;

      this.setState({
        comment,
      });
    }

    _handleChangeRating(evt) {
      const rating = evt.target.value;

      this.setState({
        rating,
      });
    }

    _handleSubmitReview(evt) {
      const {selectedFilm, handleSubmitReview} = this.props;
      const {rating, comment} = this.state;
      evt.preventDefault();

      handleSubmitReview(selectedFilm.id, {
        rating,
        comment,
      });
    }

    render() {
      const {rating, comment} = this.state;

      return <Component
        {...this.props}
        comment={comment}
        onChangeComment={this._handleChangeComment}
        onChangeRating={this._handleChangeRating}
        onSubmitReview={this._handleSubmitReview}
        rating={rating}
      />;
    }
  }

  const mapStateToProps = (state, props) => ({
    selectedFilm: getFilmById(state, props.selectedID),
  });

  const mapDispatchToProps = (dispatch) => ({
    handleSubmitReview(review, id) {
      dispatch(DataOperations.sendComment(review, id));
    },

    loadFilms() {
      dispatch(DataOperations.loadFilms());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithComment);
};

export default withComment;
