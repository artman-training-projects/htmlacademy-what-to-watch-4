import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import MovieCard from './movie-card.jsx';
import {films, moviePoster} from '../data-for-test.js';
import NameSpace from '../../reducer/name-space.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`MovieCard`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: `/`,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authorizationError: false,
    }
  });

  it(`Should onPlayClick clicked on promo`, () => {
    const handlePlayClick = jest.fn();

    const movieCard = mount(
        <Provider store={store}>
          <MovieCard
            activeTab={`Overview`}
            film={moviePoster}
            onActiveTabChange={() => {}}
            onActiveTabRender={() => {}}
            onSignInClick={() => {}}
            onPlayClick={handlePlayClick}
            onSmallMovieCardClick={() => {}}
            sameFilms={films}
          />
        </Provider>
    );

    const buttonPlay = movieCard.find(`.btn--play`);
    buttonPlay.simulate(`click`, moviePoster);
    expect(handlePlayClick).toHaveBeenCalledWith(moviePoster);
  });
});
