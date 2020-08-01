import * as React from 'react';
import {Comment} from '../custom-types';
import {FullMonth} from '../../const';

const getDateTime = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const getDateTimeString = (time) => {
  const date = new Date(time);
  return `${FullMonth[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`;
};

interface Props {
  comment: Comment;
}

const MovieReview: React.FC<Props> = (props: Props) => {
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

export default MovieReview;
