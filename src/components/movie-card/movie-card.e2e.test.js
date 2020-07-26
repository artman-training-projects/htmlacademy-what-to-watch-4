import React from 'react';
import {Router} from 'react-router-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
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
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authorizationError: false,
    }
  });

  const locationToPlay = {
    pathname: `${Pages.PLAYER}/${films[2].id}`
  };

  const locationToReview = {
    pathname: `${Pages.FILM}/${films[2].id}/review`
  };

  it(`Should clicked Play button`, () => {
    const movieCard = mount(
        <Router history={history}>
          <Provider store={store}>
            <MovieCard
              activeTab={MovieNavList.OVERVIEW}
              authorizationStatus={`NO_AUTH`}
              onActiveTabChange={() => {}}
              onActiveTabRender={() => {}}
              onSmallMovieCardClick={() => {}}
              sameFilms={films}
              selectedFilm={moviePoster}
            />
          </Provider>
        </Router>
    );

    const buttonPlay = movieCard.find(`.btn .btn--play .movie-card__button`);
    buttonPlay.simulate(`click`, movieCard.instance().setState({
      location: locationToPlay,
    }));
    expect(movieCard.instance().state.location).toEqual(locationToPlay);
  });

  it(`Should clicked AddReview button`, () => {
    const movieCard = mount(
        <Router history={history}>
          <Provider store={store}>
            <MovieCard
              activeTab={MovieNavList.OVERVIEW}
              authorizationStatus={`AUTH`}
              onActiveTabChange={() => {}}
              onActiveTabRender={() => {}}
              onSmallMovieCardClick={() => {}}
              sameFilms={films}
              selectedFilm={moviePoster}
            />
          </Provider>
        </Router>
    );

    const buttonReview = movieCard.find(`.btn .btn--review .movie-card__button`);
    buttonReview.simulate(`click`, movieCard.instance().setState({
      location: locationToReview,
    }));
    expect(movieCard.instance().state.location).toEqual(locationToReview);
  });
});
