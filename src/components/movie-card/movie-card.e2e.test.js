import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {MovieNavList, Pages} from '../../const.js';
import {films, moviePoster} from '../data-for-test.js';
import NameSpace from '../../reducer/name-space.js';
import MovieCard from './movie-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);


describe(`MovieCard`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MOVIE_CARD,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authorizationError: false,
    }
  });

  it(`Should clicked Play button`, () => {
    const handlePlayClick = jest.fn();

    const movieCard = mount(
        <Provider store={store}>
          <MovieCard
            activeTab={MovieNavList.OVERVIEW}
            authorizationStatus={`NO_AUTH`}
            film={moviePoster}
            onActiveTabChange={() => {}}
            onActiveTabRender={() => {}}
            onSignInClick={() => {}}
            onPlayClick={handlePlayClick}
            onReviewClick={() => {}}
            onSmallMovieCardClick={() => {}}
            sameFilms={films}
          />
        </Provider>
    );

    const buttonPlay = movieCard.find(`.btn--play`);
    buttonPlay.simulate(`click`, moviePoster);
    expect(handlePlayClick).toHaveBeenCalledWith(moviePoster);
  });

  it(`Should clicked AddReview button`, () => {
    const handleReviewClick = jest.fn();

    const movieCard = mount(
        <Provider store={store}>
          <MovieCard
            activeTab={MovieNavList.OVERVIEW}
            authorizationStatus={`AUTH`}
            film={moviePoster}
            onActiveTabChange={() => {}}
            onActiveTabRender={() => {}}
            onSignInClick={() => {}}
            onPlayClick={() => {}}
            onReviewClick={handleReviewClick}
            onSmallMovieCardClick={() => {}}
            sameFilms={films}
          />
        </Provider>
    );

    const buttonReview = movieCard.find(`.btn--review`);
    buttonReview.simulate(`click`, moviePoster.id);
    expect(handleReviewClick).toHaveBeenCalledWith(moviePoster.id);
  });
});
