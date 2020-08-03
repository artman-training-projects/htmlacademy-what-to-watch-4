import * as React from 'react';
import {Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history';
import MovieCard from './movie-card';
import {films, moviePoster, noop} from '../data-test-set';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

describe(`MovieCard`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authorizationError: false,
      authorizationInProgress: false,
    },
    [NameSpace.DATA]: {
      films,
      sendingFavoriteFilm: false,
      sendFavoriteFilmDone: false,
      sendFavoriteFilmError: false,
    },
    [NameSpace.SHOW]: {
      selectedFilm: films[2],
    },
  });

  it(`Render MovieCard, auth no`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieCard
              activeTab={`Overview`}
              authorizationStatus={`NO_AUTH`}
              handleFilmChoose={noop}
              onActiveTabChange={noop}
              onActiveTabRender={noop}
              sameFilms={films}
              selectedFilm={moviePoster}
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

  it(`Render MovieCard, auth yes`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieCard
              activeTab={`Overview`}
              authorizationStatus={`AUTH`}
              handleFilmChoose={noop}
              onActiveTabChange={noop}
              onActiveTabRender={noop}
              sameFilms={films}
              selectedFilm={moviePoster}
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
