import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from '../../history.js';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {Pages} from '../../const.js';
import {getGenres, getFilms, getFilmsStatus, getPromo, getPromoStatus, getFavoriteFilmSendStatus} from '../../reducer/data/selectors.js';
import {Operations as DataOperations} from '../../reducer/data/data.js';
import {ActionCreator} from '../../reducer/show-films/show-films.js';
import {getCurrentGenre, getFilmsByGenre} from '../../reducer/show-films/selectors.js';

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
    handleFilmFavorite,
    handleGenreChoose,
    isAuth,
    loadPromo,
    loadingFilms,
    loadingPromo,
    moviePoster,
    numberOfFilms,
    onCountShowFilmAdd,
    onCountShowFilmReset,
    sendFavoriteFilm,
  } = props;

  const showFilms = filmsByGenre.slice(0, numberOfFilms);

  if (sendFavoriteFilm.sendingIsDone) {
    loadPromo();
  }

  const isLoadingPromo = () => {
    if (loadingPromo.promoIsLoading && !loadingPromo.loadingIsError) {
      return `promo is loading...`;
    }

    if (loadingPromo.promoIsLoading && loadingPromo.loadingIsError) {
      return `server error, try later...`;
    }

    return false;
  };

  const isLoadingFilms = () => {
    if (loadingFilms.filmsIsLoading && !loadingFilms.loadingIsError) {
      return `films is loading...`;
    }

    if (loadingFilms.filmsIsLoading && loadingFilms.loadingIsError) {
      return `server error, try later...`;
    }

    return false;
  };

  const isInMyLyst = moviePoster.isFavorite ?
    <React.Fragment>
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
    </React.Fragment> :
    <React.Fragment>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
    </React.Fragment>;

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

          {isLoadingPromo() ||
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{moviePoster.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{moviePoster.genre}</span>
              <span className="movie-card__year">{moviePoster.year}</span>
            </p>

            <div className="movie-card__buttons">
              <Link to={`${Pages.PLAYER}/${moviePoster.id}`} className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <button className="btn btn--list movie-card__button" type="button"
                onClick={() => isAuth ? handleFilmFavorite(moviePoster) : history.push(`${Pages.SIGN_IN}`)}
              >
                {isInMyLyst}
                <span>My list</span>
              </button>
            </div>
          </div>
          }
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

        {isLoadingFilms() ||
          <MoviesList
            films={showFilms}
          />
        }


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
  handleFilmFavorite: PropTypes.func.isRequired,
  handleGenreChoose: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  loadingFilms: PropTypes.shape({
    filmsIsLoading: PropTypes.bool.isRequired,
    loadingIsError: PropTypes.bool.isRequired,
  }),
  loadPromo: PropTypes.func.isRequired,
  loadingPromo: PropTypes.shape({
    promoIsLoading: PropTypes.bool.isRequired,
    loadingIsError: PropTypes.bool.isRequired,
  }),
  moviePoster: PropTypes.oneOfType([
    CustomPropTypes.FILM,
    PropTypes.bool,
  ]),
  numberOfFilms: PropTypes.number.isRequired,
  onCountShowFilmAdd: PropTypes.func.isRequired,
  onCountShowFilmReset: PropTypes.func.isRequired,
  sendFavoriteFilm: PropTypes.shape({
    favoriteFilmIsSending: PropTypes.bool.isRequired,
    sendingIsError: PropTypes.bool.isRequired,
    sendingIsDone: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  availableGenres: getGenres(state),
  currentGenre: getCurrentGenre(state),
  films: getFilms(state),
  filmsByGenre: getFilmsByGenre(state),
  loadingPromo: getPromoStatus(state),
  loadingFilms: getFilmsStatus(state),
  moviePoster: getPromo(state),
  sendFavoriteFilm: getFavoriteFilmSendStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleGenreChoose(genre) {
    dispatch(ActionCreator.chooseGenre(genre));
  },

  handleFilmFavorite(film) {
    dispatch(DataOperations.sendFavoriteFilm(film.id, film.isFavorite));
  },

  loadPromo() {
    dispatch(DataOperations.loadPromo());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
