import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {getReviewStatus} from '../../reducer/data/selectors.js';
import Header from '../header/header.jsx';

const ReviewLength = {
  MIN: 50,
  MAX: 400,
};

const AddReview = (props) => {
  const {comment, film, onChangeComment, onChangeRating, onSubmitReview, sendingComment, rating} = props;

  const isValidReview = (rating && comment) ? false : true;

  const isSendingReview = () => {
    if (sendingComment.commentsIsSending && !sendingComment.sendingIsError) {
      return ``;
    } else if (sendingComment.commentsIsSending && sendingComment.sendingIsError) {
      return `sending review error, try again...`;
    }

    return false;
  };

  const isBlocked = (sendingComment.commentsIsSending && !sendingComment.sendingIsError) ? true : false;

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
        <form action="#" className="add-review__form" disabled={isBlocked}
          onSubmit={onSubmitReview}
        >

          <div className="rating">
            <div className="rating__stars"
              onChange={onChangeRating}
            >
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" disabled={isBlocked} />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" disabled={isBlocked} />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" disabled={isBlocked} />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" disabled={isBlocked} />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" disabled={isBlocked} />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
              disabled={isBlocked}
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              onInput={onChangeComment}
            ></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isValidReview || isBlocked}>Post</button>
            </div>
          </div>
          {isSendingReview()}
        </form>
      </div>

    </section>
  );
};

AddReview.propTypes = {
  comment: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  film: CustomPropTypes.FILM,
  onChangeComment: PropTypes.func.isRequired,
  onChangeRating: PropTypes.func.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
  sendingComment: PropTypes.shape({
    commentsIsSending: PropTypes.bool.isRequired,
    sendingIsError: PropTypes.bool.isRequired,
  }),
  rating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

const mapStateToProps = (state) => ({
  sendingComment: getReviewStatus(state),
});

export default connect(mapStateToProps)(AddReview);
