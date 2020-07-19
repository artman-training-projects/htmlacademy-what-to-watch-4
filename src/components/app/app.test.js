import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {films, moviePoster} from '../data-for-test.js';
import {ALL_GENRES} from '../../const.js';
import App from './app.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`App`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: `/`,
    },
    [NameSpace.DATA]: {
      films,
      moviePoster: false,
    },
    [NameSpace.SHOW]: {
      currentGenre: ALL_GENRES,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authorizationError: false,
    },
  });

  it(`Render`, () => {
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
});
