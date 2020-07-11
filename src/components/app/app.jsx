import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {ActionCreator} from '../../store/reducer.js';
import {Pages} from '../../const.js';

import Main from '../main/main.jsx';
import MovieCard from '../movie-card/movie-card.jsx';
import VideoPlayerFull from '../video-player-full/video-player-full.jsx';
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
    }

    return null;
  }

  _renderMain() {
    return (
      <MainWrapped
        onSmallMovieCardClick={this._handleSmallMovieCardClick}
        onPlayClick={this._handlePlayClick}
      />
    );
  }

  _renderMovieCard() {
    const {films, selectedFilm: moviePoster} = this.props;

    const sameFilms = films
      .filter((film) => film.genre === moviePoster.genre && film.title !== moviePoster.title)
      .slice(0, COUNT_OF_SAME_FILMS);

    return (
      <MovieCardWrapped
        {...this.props}
        film={moviePoster}
        onPlayClick={this._handlePlayClick}
        onSmallMovieCardClick={this._handleSmallMovieCardClick}
        sameFilms={sameFilms}
      />
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
    const {handlePageChange, onFilmSelect} = this.props;
    handlePageChange(Pages.MOVIE_CARD);
    onFilmSelect(film);
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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  currentPage: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  handlePageChange: PropTypes.func.isRequired,
  moviePoster: CustomPropTypes.FILM,
  onFilmSelect: PropTypes.func.isRequired,
  selectedFilm: PropTypes.oneOfType([
    CustomPropTypes.FILM,
    PropTypes.bool,
  ]),
};

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  films: state.films,
  moviePoster: state.moviePoster,
});

const mapDispatchToProps = (dispatch) => ({
  handlePageChange(page) {
    dispatch(ActionCreator.setCurrentPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
