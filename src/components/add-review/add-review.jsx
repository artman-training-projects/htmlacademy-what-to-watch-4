import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {getReviewStatus} from '../../reducer/data/selectors.js';
import Header from '../header/header.jsx';

const ReviewLength = {
  MIN: 50,
  MAX: 400,
};

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: false,
      comment: false,
    };

    this._handleChangeComment = this._handleChangeComment.bind(this);
    this._handleChangeRating = this._handleChangeRating.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
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

  _handleSubmit(evt) {
    const {film, onSubmitReview} = this.props;
    const {rating, comment} = this.state;
    evt.preventDefault();

    onSubmitReview(film.id, {
      rating,
      comment,
    });
  }

  render() {
    const {film, sendingComment} = this.props;
    const {rating, comment} = this.state;

    const isValidReview = (rating && comment) ?
      <React.Fragment>
        <button className="add-review__btn" type="submit">Post</button>
      </React.Fragment> :
      <React.Fragment>
        <button className="add-review__btn" type="submit" disabled>Post</button>
      </React.Fragment>;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={film.bg} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            film={film}
          />

          <div className="movie-card__poster movie-card__poster--small">
            <img src={film.poster} alt={film.title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form"
            onSubmit={this._handleSubmit}
          >
            <div className="rating">
              <div className="rating__stars"
                onChange={this._handleChangeRating}
              >
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" minLength={ReviewLength.MIN} maxLength={ReviewLength.MAX}
                onInput={this._handleChangeComment}
              ></textarea>
              <div className="add-review__submit">
                {isValidReview}
              </div>
            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
  film: CustomPropTypes.FILM,
  onSubmitReview: PropTypes.func.isRequired,
  sendingComment: PropTypes.shape({
    commentsIsSending: PropTypes.bool.isRequired,
    sendingIsError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  sendingComment: getReviewStatus(state),
});

export default connect(mapStateToProps)(AddReview);
