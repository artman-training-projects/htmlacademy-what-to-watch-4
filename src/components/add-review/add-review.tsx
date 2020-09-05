import * as React from 'react';
import {connect} from 'react-redux';
import {Comment, Film} from '../custom-types';

import {Pages} from '../../const';
import {sendCommentStatus} from '../../reducer/data/selectors';
import Header from '../header/header';

const ReviewLength = {
  MIN: 50,
  MAX: 400,
};

interface Props {
  comment: Comment;
  history: any;
  onChangeComment: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeRating: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitReview: (evt: React.FormEvent<HTMLFormElement>) => void;
  selectedFilm: Film;
  sendingComment: {
    commentsIsSending: boolean;
    sendingIsDone: boolean;
    sendingIsError: boolean;
  };
  rating: string;
}

const AddReview: React.FC<Props> = (props: Props) => {
  const {
    comment,
    history,
    onChangeComment,
    onChangeRating,
    onSubmitReview,
    selectedFilm,
    sendingComment,
    rating,
  } = props;

  const isValidReview = (rating && comment) ? false : true;

  const isSendingReview = () => {
    if (sendingComment.sendingIsDone) {
      history.goBack(`${Pages.FILM}/${selectedFilm.id}`);
    }

    if (sendingComment.commentsIsSending && !sendingComment.sendingIsError) {
      return ``;
    }

    if (sendingComment.commentsIsSending && sendingComment.sendingIsError) {
      return `sending review error, try again...`;
    }

    return false;
  };

  const isBlocked = (sendingComment.commentsIsSending && !sendingComment.sendingIsError);

  return (
    <section className="movie-card movie-card--full" style={{backgroundColor: selectedFilm.bgc}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={selectedFilm.bg} alt={selectedFilm.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          film={selectedFilm}
        />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={selectedFilm.poster} alt={selectedFilm.title} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form"
          onSubmit={onSubmitReview}
        >

          <div className="rating">
            <div className="rating__stars"
              onChange={onChangeRating}
            >
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" defaultChecked disabled={isBlocked} />
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

const mapStateToProps = (state) => ({
  sendingComment: sendCommentStatus(state),
});

export default connect(mapStateToProps)(AddReview);
