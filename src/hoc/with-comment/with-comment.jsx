import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../../components/custom-prop-types.js';
import {Operations as DataOperations} from '../../reducer/data/data.js';
import {getFilmById} from '../../reducer/data/selectors.js';

const withComment = (Component) => {
  class WithComment extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: false,
        comment: false,
      };

      this._handleChangeComment = this._handleChangeComment.bind(this);
      this._handleChangeRating = this._handleChangeRating.bind(this);
      this._handleSubmitReview = this._handleSubmitReview.bind(this);
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

    componentDidMount() {
      const {loadFilms} = this.props;
      loadFilms();
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

  WithComment.propTypes = {
    handleSubmitReview: PropTypes.func.isRequired,
    loadFilms: PropTypes.func.isRequired,
    selectedFilm: PropTypes.oneOfType([
      CustomPropTypes.FILM,
      PropTypes.bool,
    ]),
    sendingComment: PropTypes.shape({
      commentsIsSending: PropTypes.bool.isRequired,
      sendingIsError: PropTypes.bool.isRequired,
    }),
  };

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
