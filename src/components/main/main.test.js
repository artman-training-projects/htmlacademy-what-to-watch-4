import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
import {films, moviePoster} from '../data-for-test.js';
import {ALL_GENRES} from '../../const.js';
import Main from './main.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`Main`, () => {
  it(`Render with films and promo`, () => {
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
        <Router history={history}>
          <Provider store={store}>
            <Main
              isAuth={true}
              numberOfFilms={8}
              onCountShowFilmAdd={() => {}}
              onCountShowFilmReset={() => {}}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render with loading films and promo`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        moviePoster,
        loadingFilms: true,
        loadFilmsError: false,
        loadingPromo: true,
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
        <Router history={history}>
          <Provider store={store}>
            <Main
              isAuth={true}
              numberOfFilms={8}
              onCountShowFilmAdd={() => {}}
              onCountShowFilmReset={() => {}}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render with error loading films and promo`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        moviePoster,
        loadingFilms: true,
        loadFilmsError: true,
        loadingPromo: true,
        loadPromoError: true,
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
        <Router history={history}>
          <Provider store={store}>
            <Main
              isAuth={true}
              numberOfFilms={8}
              onCountShowFilmAdd={() => {}}
              onCountShowFilmReset={() => {}}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
