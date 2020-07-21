import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../../components/custom-prop-types.js';

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
      const {film, onSubmitReview} = this.props;
      const {rating, comment} = this.state;
      evt.preventDefault();

      onSubmitReview(film.id, {
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

  WithComment.propTypes = {
    film: CustomPropTypes.FILM,
    onSubmitReview: PropTypes.func.isRequired,
    sendingComment: PropTypes.shape({
      commentsIsSending: PropTypes.bool.isRequired,
      sendingIsError: PropTypes.bool.isRequired,
    }),
  };

  return WithComment;
};

export default withComment;
