import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {ALL_GENRES} from '../../const.js';
import {getAvailableGenres} from '../../utils.js';
import {films, moviePoster} from '../data-for-test.js';
import App from './app.jsx';

const mockStore = configureStore([]);

describe(`App`, () => {
  const store = mockStore({
    films,
    moviePoster,
    availableGenres: getAvailableGenres(films),
    currentGenre: ALL_GENRES,
    filmsByGenre: films,
  });

  it(`Render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
