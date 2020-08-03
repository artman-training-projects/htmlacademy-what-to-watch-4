import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {films, moviePoster, noop, user} from '../data-test-set';
import {ALL_GENRES} from '../../const';
import App from './app';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

describe(`App`, () => {
  it(`Render pageMain`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        moviePoster,
        loadingFilms: false,
        loadFilmsError: false,
        loadingPromo: false,
        loadPromoError: false,
        sendingFavoriteFilm: false,
        sendFavoriteFilmDone: false,
        sendFavoriteFilmError: false,
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
        authorizationInProgress: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmSelect={noop}
            film={moviePoster}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render pageMovieCard`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        moviePoster,
        loadingFilms: false,
        loadFilmsError: false,
        loadingPromo: false,
        loadPromoError: false,
        sendingFavoriteFilm: false,
        sendFavoriteFilmDone: false,
        sendFavoriteFilmError: false,
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
        authorizationInProgress: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmSelect={noop}
            film={moviePoster}
            selectedFilm={moviePoster}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render pageSignIn`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        moviePoster,
        loadingFilms: false,
        loadFilmsError: false,
        loadingPromo: false,
        loadPromoError: false,
        sendingFavoriteFilm: false,
        sendFavoriteFilmDone: false,
        sendFavoriteFilmError: false,
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
        authorizationInProgress: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmSelect={noop}
            film={moviePoster}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render pageAddReview`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        moviePoster,
        loadingFilms: false,
        loadFilmsError: false,
        loadingPromo: false,
        loadPromoError: false,
        sendingComment: false,
        sendCommentDone: false,
        sendCommentError: false,
        sendingFavoriteFilm: false,
        sendFavoriteFilmDone: false,
        sendFavoriteFilmError: false,
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        authorizationError: false,
        authorizationInProgress: false,
        user,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmClick={noop}
            onFilmSelect={noop}
            selectedFilm={moviePoster}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
