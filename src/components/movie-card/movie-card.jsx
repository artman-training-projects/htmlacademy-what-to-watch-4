import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import MovieNavTabs from '../movie-nav-tabs/movie-nav-tabs.jsx';
import MovieNavOverview from '../movie-nav-overview/movie-nav-overview.jsx';
import MovieNavDetails from '../movie-nav-details/movie-nav-details.jsx';
import MovieNavReviews from '../movie-nav-reviews/movie-nav-reviews.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const MovieNavList = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: MovieNavList.OVERVIEW,
    };

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(tab) {
    this.setState({
      currentTab: tab,
    });
  }

  _renderCurrentTab(currentTab) {
    const {film} = this.props;

    switch (currentTab) {
      case MovieNavList.OVERVIEW:
        return (
          <MovieNavOverview
            rating={film.rating}
            votes={film.votes}
            description={film.description}
            director={film.director}
            starring={film.starring}
          />
        );
      case MovieNavList.DETAILS:
        return (
          <MovieNavDetails
            director={film.director}
            starring={film.starring}
            time={film.time}
            genre={film.genre}
            year={film.year}
          />
        );
      case MovieNavList.REVIEWS:
        return (
          <MovieNavReviews
            reviews={film.reviews}
          />
        );
      default: return ``;
    }
  }

  render() {
    const {film, sameFilms, onSmallMovieCardClick} = this.props;
    const {currentTab} = this.state;

    return (<React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.bg} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
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
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
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
                tabs={MovieNavList}
                currentTab={currentTab}
                onTabClick={this._handleTabClick}
              />

              {this._renderCurrentTab(currentTab)}
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
  }
}

MovieCard.propTypes = {
  film: CustomPropTypes.FILM,
  sameFilms: PropTypes.arrayOf(CustomPropTypes.FILM),
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

export default MovieCard;
