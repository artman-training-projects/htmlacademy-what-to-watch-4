import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Film, Films} from '../custom-types';

import {AuthorizationStatus, MovieNavList, Pages} from '../../const';
import {Operations as DataOperations} from '../../reducer/data/data';
import {getFavoriteFilmSendStatus} from '../../reducer/data/selectors';
import {getAuthStatus} from '../../reducer/user/selectors';
import {getSameFilms} from '../../reducer/show-films/selectors';

import MovieNavTabs from '../movie-nav-tabs/movie-nav-tabs';
import MoviesList from '../movies-list/movies-list';
import Header from '../header/header';
import Footer from '../footer/footer';

interface Props {
  activeTab: string;
  auth: {
    status: string;
    error: boolean;
  };
  handleFilmFavorite: ({}) => void;
  history: any;
  loadFilms: () => void;
  onActiveTabChange: () => void;
  onActiveTabRender: () => void;
  sameFilms: Films;
  selectedFilm?: Film;
  sendFavoriteFilm: {
    favoriteFilmIsSending: boolean;
    sendingIsError: boolean;
    sendingIsDone: boolean;
  };
}

const MovieCard: React.FC<Props> = (props: Props) => {
  const {
    activeTab,
    auth,
    handleFilmFavorite,
    history,
    loadFilms,
    onActiveTabChange,
    onActiveTabRender,
    sameFilms,
    selectedFilm,
    sendFavoriteFilm,
  } = props;

  const isSignIn = auth.status === AuthorizationStatus.AUTH;

  if (sendFavoriteFilm.sendingIsDone) {
    loadFilms();
  }

  const isInMyLyst = selectedFilm.isFavorite ?
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
    <section className="movie-card movie-card--full" style={{backgroundColor: selectedFilm.bgc}}>
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={selectedFilm.bg} alt={selectedFilm.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{selectedFilm.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{selectedFilm.genre}</span>
              <span className="movie-card__year">{selectedFilm.year}</span>
            </p>

            <div className="movie-card__buttons">
              <Link to={`${Pages.PLAYER}/${selectedFilm.id}`} className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <button className="btn btn--list movie-card__button" type="button"
                onClick={() => isSignIn ? handleFilmFavorite(selectedFilm) : history.push(`${Pages.SIGN_IN}`)}
              >
                {isInMyLyst}
                <span>My list</span>
              </button>

              {isSignIn &&
                <Link to={`${Pages.FILM}/${selectedFilm.id}/review`} className="btn btn--review movie-card__button">Add review</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={selectedFilm.poster} alt={selectedFilm.title} width="218" height="327" />
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
          history={history}
        />
      </section>

      <Footer />
    </div>
  </React.Fragment>);
};

const mapStateToProps = (state, props) => ({
  auth: getAuthStatus(state),
  sameFilms: getSameFilms(state, props.selectedFilm),
  sendFavoriteFilm: getFavoriteFilmSendStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleFilmFavorite(film) {
    dispatch(DataOperations.sendFavoriteFilm(film.id, film.isFavorite));
  },

  loadFilms() {
    dispatch(DataOperations.loadFilms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
