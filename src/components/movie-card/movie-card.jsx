import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {AuthorizationStatus, MovieNavList} from '../../const.js';
import MovieNavTabs from '../movie-nav-tabs/movie-nav-tabs.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const MovieCard = (props) => {
  const {
    activeTab,
    authorizationStatus,
    film,
    onActiveTabChange,
    onActiveTabRender,
    onPlayClick,
    onReviewClick,
    onSignInClick,
    onSmallMovieCardClick,
    sameFilms,
  } = props;

  const isSignIn = authorizationStatus === AuthorizationStatus.AUTH ?
    <React.Fragment>
      <a href="review" className="btn btn--review movie-card__button"
        onClick={(evt) => {
          evt.preventDefault();
          onReviewClick(film.id);
        }}
      >Add review</a>
    </React.Fragment> : ``;

  return (<React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={film.bg} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          onSignInClick={onSignInClick}
        />

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{film.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{film.genre}</span>
              <span className="movie-card__year">{film.year}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button"
                onClick={() => onPlayClick(film)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>

              {isSignIn}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={film.poster} alt={film.title} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <MovieNavTabs
              activeTab={activeTab}
              onActiveTabChange={onActiveTabChange}
              tabs={MovieNavList}
            />

            {onActiveTabRender()}
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <MoviesList
          films={sameFilms}
          onSmallMovieCardClick={onSmallMovieCardClick}
        />
      </section>

      <Footer />
    </div>
  </React.Fragment>);
};

MovieCard.propTypes = {
  activeTab: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  film: CustomPropTypes.FILM,
  onActiveTabChange: PropTypes.func.isRequired,
  onActiveTabRender: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onReviewClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  sameFilms: PropTypes.arrayOf(CustomPropTypes.FILM),
};

export default MovieCard;
