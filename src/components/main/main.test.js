import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {getAvailableGenres} from '../../utils.js';
import {films, moviePoster} from '../data-for-test.js';
import Main from './main.jsx';

const mockStore = configureStore([]);

describe(`Main`, () => {
  const store = mockStore({
    films,
    moviePoster,
    availableGenres: getAvailableGenres(films),
    currentGenre: `All genres`,
    filmsByGenre: films,
    currentPage: `/`,
  });

  it(`Render Main`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Main
            onSmallMovieCardClick={() => {}}
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
