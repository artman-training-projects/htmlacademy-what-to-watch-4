import React from 'react';
import {Router} from 'react-router-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
import {films, moviePoster} from '../data-for-test.js';
import Main from './main.jsx';
import NameSpace from '../../reducer/name-space.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`Main`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films,
      moviePoster,
      loadingFilms: false,
      loadFilmsError: false,
      loadingPromo: false,
      loadPromoError: false,
    },
    [NameSpace.SHOW]: {
      currentGenre: `All genres`,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authorizationError: false,
    }
  });

  it(`Should movieCardTitle clicked`, () => {
    const handleSmallMovieCardClick = jest.fn();

    const main = mount(
        <Router history={history}>
          <Provider store={store}>
            <Main
              numberOfFilms={8}
              onSignInClick={() => {}}
              onSmallMovieCardClick={handleSmallMovieCardClick}
              onCountShowFilmAdd={() => {}}
              onCountShowFilmReset={() => {}}
              onPlayClick={() => {}}
            />
          </Provider>
        </Router>
    );

    const smallMovieCardTitles = main.find(`.small-movie-card__title`);
    smallMovieCardTitles.forEach((cardTitle) => cardTitle.simulate(`click`));
    expect(handleSmallMovieCardClick.mock.calls.length).toBe(films.length);
  });

  it(`Should play clicked`, () => {
    const handlePlayClick = jest.fn();
    const film = moviePoster;

    const main = mount(
        <Router history={history}>
          <Provider store={store}>
            <Main
              numberOfFilms={8}
              onSmallMovieCardClick={handlePlayClick}
              onCountShowFilmAdd={() => {}}
              onCountShowFilmReset={() => {}}
            />
          </Provider>
        </Router>
    );

    const playButton = main.find(`.btn .btn--play .movie-card__button`);
    playButton.simulate(`click`, film);
    expect(handlePlayClick).toHaveBeenCalledWith(film);
  });

  it(`Should section catalogMore exist`, () => {
    const main = mount(
        <Router history={history}>
          <Provider store={store}>
            <Main
              numberOfFilms={4}
              onSmallMovieCardClick={() => {}}
              onCountShowFilmAdd={() => {}}
              onCountShowFilmReset={() => {}}
            />
          </Provider>
        </Router>
    );

    const catalogMore = main.find(`.catalog__more`);
    expect(catalogMore.length).toEqual(1);
  });

  it(`Should section catalogMore no exist`, () => {
    const storeCrime = mockStore({
      [NameSpace.DATA]: {
        films,
        moviePoster,
        loadingFilms: false,
        loadFilmsError: false,
        loadingPromo: false,
        loadPromoError: false,
      },
      [NameSpace.SHOW]: {
        currentGenre: `Crime`,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
      }
    });

    const main = mount(
        <Router history={history}>
          <Provider store={storeCrime}>
            <Main
              numberOfFilms={8}
              onSmallMovieCardClick={() => {}}
              onCountShowFilmAdd={() => {}}
              onCountShowFilmReset={() => {}}
            />
          </Provider>
        </Router>
    );

    const catalogMore = main.find(`.catalog__more`);
    expect(catalogMore.length).toEqual(0);
  });
});
