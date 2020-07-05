import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {ActionCreator} from '../../store/reducer.js';
import {Pages} from '../../const.js';

import Main from '../main/main.jsx';
import MovieCard from '../movie-card/movie-card.jsx';
import withActiveTab from '../../hoc/with-active-tab/with-active-tab.jsx';

const MovieCardWrapped = withActiveTab(MovieCard);

const COUNT_OF_SAME_FILMS = 4;

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      selectedMovie: null,
    };

    this._handleSmallMovieCardClick = this._handleSmallMovieCardClick.bind(this);
  }

  _renderApp() {
    const {currentPage} = this.props;

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
      <Main
        onSmallMovieCardClick={this._handleSmallMovieCardClick}
      />
    );
  }

  _renderMovieCard() {
    const {films} = this.props;
    const moviePoster = this.state.selectedMovie;

    const sameFilms = films
      .filter((film) => film.genre === moviePoster.genre && film.title !== moviePoster.title)
      .slice(0, COUNT_OF_SAME_FILMS);

    return (
      <MovieCardWrapped
        {...this.props}
        film={moviePoster}
        sameFilms={sameFilms}
        onSmallMovieCardClick={this._handleSmallMovieCardClick}
      />
    );
  }

  _handleSmallMovieCardClick(film) {
    const {handlePageChange} = this.props;
    handlePageChange(Pages.MOVIE_CARD);

    this.setState({
      selectedMovie: film,
    });

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
              sameFilms={this.props.films}
              onSmallMovieCardClick={this._handleSmallMovieCardClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  moviePoster: CustomPropTypes.FILM,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  moviePoster: state.moviePoster,
  currentPage: state.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  handlePageChange(page) {
    dispatch(ActionCreator.setCurrentPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
