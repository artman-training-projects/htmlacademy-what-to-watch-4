import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {films, moviePoster, user} from '../data-for-test.js';
import {ALL_GENRES} from '../../const.js';
import App from './app.jsx';
import NameSpace from '../../reducer/name-space.js';

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
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmSelect={() => {}}
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
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmSelect={() => {}}
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
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmSelect={() => {}}
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
      },
      [NameSpace.SHOW]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        authorizationError: false,
        user,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmClick={() => {}}
            onFilmSelect={() => {}}
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
