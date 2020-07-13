import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/reducer.js';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {ALL_GENRES} from '../../const.js';
import MovieNavGenre from '../movie-nav-genre/movie-nav-genre.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import CatalogMore from '../catalog-more/catalog-more.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const Main = (props) => {
  const {
    availableGenres,
    currentGenre,
    films,
    filmsByGenre,
    handleGenreChoose,
    moviePoster,
    numberOfFilms,
    onCountShowFilmAdd,
    onCountShowFilmReset,
    onPlayClick,
    onSmallMovieCardClick,
  } = props;

  const showFilms = filmsByGenre.slice(0, numberOfFilms);

  return (<React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={moviePoster.bg} alt={moviePoster.title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

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
              <button className="btn btn--play movie-card__button" type="button"
                onClick={() => onPlayClick(moviePoster)}
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieNavGenre
          currentGenre={currentGenre}
          films={films}
          genres={availableGenres}
          onGenreClick={handleGenreChoose}
          onResetShowClick={onCountShowFilmReset}
        />

        <MoviesList
          films={showFilms}
          onSmallMovieCardClick={onSmallMovieCardClick}
        />

        {numberOfFilms < filmsByGenre.length &&
            <CatalogMore
              onShowMoreClick={onCountShowFilmAdd}
            />
        }
      </section>

      <Footer />
    </div>
  </React.Fragment>);

};

Main.propTypes = {
  availableGenres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  filmsByGenre: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  handleGenreChoose: PropTypes.func.isRequired,
  moviePoster: CustomPropTypes.FILM,
  numberOfFilms: PropTypes.number.isRequired,
  onCountShowFilmAdd: PropTypes.func.isRequired,
  onCountShowFilmReset: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  availableGenres: state.availableGenres,
  currentGenre: state.currentGenre,
  films: state.films,
  filmsByGenre: state.filmsByGenre,
  moviePoster: state.moviePoster,
});

const mapDispatchToProps = (dispatch) => ({
  handleGenreChoose(genre, films) {
    dispatch(ActionCreator.chooseGenre(genre));

    if (genre !== ALL_GENRES) {
      dispatch(ActionCreator.getFilmsByGenre(genre, films));
    } else {
      dispatch(ActionCreator.getAllFilms(films));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
