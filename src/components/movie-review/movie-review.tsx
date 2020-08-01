import React from 'react';
import {CustomPropTypes} from '../custom-prop-types.js';
import {FullMonth} from '../../const.js';

const getDateTime = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const getDateTimeString = (time) => {
  const date = new Date(time);
  return `${FullMonth[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`;
};

const MovieReview = (props) => {
  const {comment} = props;

  return (<React.Fragment>
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment && comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment && comment.user.name}</cite>
          <time className="review__date" dateTime={comment && getDateTime(comment.date)}>{comment && getDateTimeString(comment.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment && comment.rating}</div>
    </div>
  </React.Fragment>);
};

MovieReview.propTypes = {
  comment: CustomPropTypes.COMMENT,
};

export default MovieReview;
