import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {AuthorizationStatus, Pages} from '../../const.js';
import {ActionCreator as AppActionCreator} from '../../reducer/app/app.js';
import {getCurrentPage} from '../../reducer/app/selectors.js';
import {getAuthStatus} from '../../reducer/user/selector.js';
import {Operations as DataOperations} from '../../reducer/data/data.js';
import {getFilms, getPromo} from '../../reducer/data/selectors.js';

import Main from '../main/main.jsx';
import MovieCard from '../movie-card/movie-card.jsx';
import AddReview from '../add-review/add-review.jsx';
import VideoPlayerFull from '../video-player-full/video-player-full.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withCountFilms from '../../hoc/with-count-films/with-count-films.jsx';
import withActiveTab from '../../hoc/with-active-tab/with-active-tab.jsx';
import withVideoControls from '../../hoc/with-video-controls/with-video-controls.jsx';

const MainWrapped = withCountFilms(Main);
const MovieCardWrapped = withActiveTab(MovieCard);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);

const COUNT_OF_SAME_FILMS = 4;

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      isVideoPlayer: false,
    };

    this._renderMoviePlayer = this._renderMoviePlayer.bind(this);
    this._handleClosePlayerClick = this._handleClosePlayerClick.bind(this);
    this._handlePlayClick = this._handlePlayClick.bind(this);
    this._handleSignInClick = this._handleSignInClick.bind(this);
    this._handleSmallMovieCardClick = this._handleSmallMovieCardClick.bind(this);
  }

  _renderApp() {
    const {currentPage} = this.props;
    const {isVideoPlayer} = this.state;

    if (isVideoPlayer) {
      return this._renderMoviePlayer();
    }

    switch (currentPage) {
      case Pages.MAIN:
        return this._renderMain();
      case Pages.MOVIE_CARD:
        return this._renderMovieCard();
      case Pages.SIGN_IN:
        return this._renderSingIn();
      case Pages.REVIEW:
        return this._renderAddReview();
    }

    return this._renderMain();
  }

  _renderMain() {
    return (
      <MainWrapped
        onSignInClick={this._handleSignInClick}
        onSmallMovieCardClick={this._handleSmallMovieCardClick}
        onPlayClick={this._handlePlayClick}
      />
    );
  }

  _renderMovieCard() {
    const {authorizationStatus, films, selectedFilm: moviePoster} = this.props;

    const sameFilms = films
      .filter((film) => film.genre === moviePoster.genre && film.title !== moviePoster.title)
      .slice(0, COUNT_OF_SAME_FILMS);

    return (
      <MovieCardWrapped
        {...this.props}
        authorizationStatus={authorizationStatus}
        film={moviePoster}
        onPlayClick={this._handlePlayClick}
        onReviewClick={() => {}}
        onSignInClick={this._handleSignInClick}
        onSmallMovieCardClick={this._handleSmallMovieCardClick}
        sameFilms={sameFilms}
      />
    );
  }

  _renderAddReview() {

    return (
      <AddReview />
    );
  }

  _renderMoviePlayer() {
    const {selectedFilm} = this.props;
    return (
      <VideoPlayerFullWrapped
        film={selectedFilm}
        onClosePlayerClick={this._handleClosePlayerClick}
      />
    );
  }

  _renderSingIn() {
    const {authorizationStatus} = this.props;
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn />
      );
    }

    return this._renderMain();
  }

  _handleClosePlayerClick() {
    this.setState({
      isVideoPlayer: false,
    });
  }

  _handlePlayClick(film) {
    const {onFilmSelect} = this.props;
    onFilmSelect(film);

    this.setState({
      isVideoPlayer: true,
    });
  }

  _handleSmallMovieCardClick(film) {
    const {getComments, handlePageChange, onFilmSelect} = this.props;
    handlePageChange(Pages.MOVIE_CARD);
    onFilmSelect(film);
    getComments(film.id);
  }

  _handleSignInClick() {
    const {handlePageChange} = this.props;
    handlePageChange(Pages.SIGN_IN);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={Pages.MAIN}>
            {this._renderApp()}
          </Route>/
          <Route exact path={Pages.MOVIE_CARD}>
            <MovieCardWrapped
              film={this.props.moviePoster}
              onSmallMovieCardClick={this._handleSmallMovieCardClick}
              sameFilms={this.props.films}
            />
          </Route>
          <Route exact path={Pages.SIGN_IN}>
            {this._renderSingIn()}
          </Route>
          <Route exact path={Pages.REVIEW}>
            {this._renderAddReview()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  getComments: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  moviePoster: PropTypes.oneOfType([
    CustomPropTypes.FILM,
    PropTypes.bool,
  ]),
  onFilmSelect: PropTypes.func.isRequired,
  selectedFilm: PropTypes.oneOfType([
    CustomPropTypes.FILM,
    PropTypes.bool,
  ]),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  currentPage: getCurrentPage(state),
  films: getFilms(state),
  moviePoster: getPromo(state),
});

const mapDispatchToProps = (dispatch) => ({
  handlePageChange(page) {
    dispatch(AppActionCreator.setCurrentPage(page));
  },

  getComments(filmID) {
    dispatch(DataOperations.loadComments(filmID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
