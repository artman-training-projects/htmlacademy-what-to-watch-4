import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/reducer.js';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import MovieNavGenre from '../movie-nav-genre/movie-nav-genre.jsx';
import MoviesList from '../movies-list/movies-list.jsx';

const Main = (props) => {
  const {
    films,
    moviePoster,
    availableGenres,
    currentGenre,
    filmsByGenre,
    onSmallMovieCardClick,
    onGenreClick,
  } = props;

  return (<React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={moviePoster.bg} alt={moviePoster.title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={moviePoster.poster} alt={moviePoster.title} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{moviePoster.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{moviePoster.genre}</span>
              <span className="movie-card__year">{moviePoster.year}</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieNavGenre
          films={films}
          genres={availableGenres}
          currentGenre={currentGenre}
          onGenreClick={onGenreClick}
        />

        <MoviesList
          films={filmsByGenre}
          onSmallMovieCardClick={onSmallMovieCardClick}
        />

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>);
};

Main.propTypes = {
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  moviePoster: CustomPropTypes.FILM,
  availableGenres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  filmsByGenre: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  moviePoster: state.moviePoster,
  availableGenres: state.availableGenres,
  currentGenre: state.currentGenre,
  filmsByGenre: state.filmsByGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre, films) {
    dispatch(ActionCreator.choiseGenre(genre));
    dispatch(ActionCreator.getFilmsByGenre(genre, films));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
