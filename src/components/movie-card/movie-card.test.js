import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';
import {films} from '../data-for-test.js';

import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const moviePoster = films[0];
const mockStore = configureStore([]);

describe(`MovieCard`, () => {
  const store = mockStore({
    currentPage: `/movie-card`,
  });

  it(`Render MovieCard`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MovieCard
            activeTab={`Overview`}
            film={moviePoster}
            onActiveTabChange={() => {}}
            onActiveTabRender={() => {}}
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
