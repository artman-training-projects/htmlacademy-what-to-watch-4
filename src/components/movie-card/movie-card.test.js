import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import MovieCard from './movie-card.jsx';
import {films, moviePoster} from '../data-for-test.js';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`MovieCard`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: `/movie-card`,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authorizationError: false,
    },
  });

  it(`Render MovieCard`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MovieCard
            activeTab={`Overview`}
            film={moviePoster}
            onActiveTabChange={() => {}}
            onActiveTabRender={() => {}}
            onSignInClick={() => {}}
            onPlayClick={() => {}}
            onSmallMovieCardClick={() => {}}
            sameFilms={films}
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
