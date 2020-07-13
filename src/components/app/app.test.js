import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {getAvailableGenres} from '../../utils.js';
import {films, moviePoster} from '../data-for-test.js';
import App from './app.jsx';

const mockStore = configureStore([]);

describe(`App`, () => {
  const store = mockStore({
    availableGenres: getAvailableGenres(films),
    currentGenre: `All genres`,
    currentPage: `/`,
    films,
    filmsByGenre: films,
    moviePoster,
  });

  it(`Render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            onFilmSelect={() => {}}
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
