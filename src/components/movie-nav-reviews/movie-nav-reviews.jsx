import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';
import MovieReview from '../movie-review/movie-review.jsx';

const MovieNavReviews = (props) => {
  const {reviews} = props;

  const halfReviews = Math.ceil(reviews.length / 2);
  const reviewsColumn1 = reviews.slice(0, halfReviews);
  const reviewsColumn2 = reviews.slice(halfReviews);

  return (<React.Fragment>
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviewsColumn1.map((review) => (
          <MovieReview
            key={review.id}
            review={review}
          />
        ))}
      </div>

      <div className="movie-card__reviews-col">
        {reviewsColumn2.map((review) => (
          <MovieReview
            key={review.id}
            review={review}
          />
        ))}
      </div>
    </div>
  </React.Fragment>);
};

export default MovieNavReviews;

MovieNavReviews.propTypes = {
  reviews: PropTypes.arrayOf(CustomPropTypes.REVIEW).isRequired,
};
