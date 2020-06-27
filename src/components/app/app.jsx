import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import Main from '../main/main.jsx';
import MovieCard from '../movie-card/movie-card.jsx';

const Pages = {
  MAIN: `/`,
  MOVIE_CARD: `/movie-card`,
};

const COUNT_OF_SAME_FILMS = 4;

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: Pages.MAIN,
      selectedMovie: null,
    };

    this._handleSmallMovieCardClick = this._handleSmallMovieCardClick.bind(this);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={Pages.MAIN}>
            {this._renderApp()}
          </Route>/
          <Route exact path={Pages.MOVIE_CARD}>
            <MovieCard
              film={this.props.moviePoster}
              sameFilms={this.props.films}
              onSmallMovieCardClick={this._handleSmallMovieCardClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {currentPage} = this.state;

    switch (currentPage) {
      case Pages.MAIN:
        return this._renderMain();
      case Pages.MOVIE_CARD:
        return this._renderMovieCard();
    }

    return null;
  }

  _renderMain() {
    const {films, moviePoster} = this.props;

    return (
      <Main
        films={films}
        moviePoster={moviePoster}
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
      <MovieCard
        film={moviePoster}
        sameFilms={sameFilms}
        onSmallMovieCardClick={this._handleSmallMovieCardClick}
      />
    );
  }

  _handleSmallMovieCardClick(film) {
    this.setState({
      currentPage: Pages.MOVIE_CARD,
      selectedMovie: film,
    });
  }
}

export default App;

App.propTypes = {
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  moviePoster: CustomPropTypes.FILM,
};
