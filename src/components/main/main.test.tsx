import * as React from 'react';
import {Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history';
import {films, moviePoster, noop} from '../data-test-set';
import {ALL_GENRES} from '../../const';
import Main from './main';
import NameSpace from '../../reducer/name-space';

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
              onCountShowFilmAdd={noop}
              onCountShowFilmReset={noop}
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
              onCountShowFilmAdd={noop}
              onCountShowFilmReset={noop}
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
              onCountShowFilmAdd={noop}
              onCountShowFilmReset={noop}
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
