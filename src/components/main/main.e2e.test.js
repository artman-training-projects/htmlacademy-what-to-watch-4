import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {getAvailableGenres} from '../../utils.js';
import {films, moviePoster} from '../data-for-test.js';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`Main`, () => {
  const store = mockStore({
    films,
    moviePoster,
    availableGenres: getAvailableGenres(films),
    currentGenre: `All genres`,
    filmsByGenre: films,
    currentPage: `/`
  });

  it(`Should movieCardTitle clicked`, () => {
    const handleSmallMovieCardClick = jest.fn();

    const main = mount(
        <Provider store={store}>
          <Main
            onSmallMovieCardClick={handleSmallMovieCardClick}
            numberOfFilms={8}
            onCountShowFilmReset={() => {}}
            onCountShowFilmAdd={() => {}}
            onPlayClick={() => {}}
          />
        </Provider>
    );

    const smallMovieCardTitles = main.find(`.small-movie-card__title`);
    smallMovieCardTitles.forEach((cardTitle) => cardTitle.simulate(`click`));
    expect(handleSmallMovieCardClick.mock.calls.length).toBe(films.length);
  });

  it(`Should play clicked`, () => {
    const handlePlayClick = jest.fn();
    const film = store.getState().moviePoster;

    const main = mount(
        <Provider store={store}>
          <Main
            onSmallMovieCardClick={() => {}}
            numberOfFilms={8}
            onCountShowFilmReset={() => {}}
            onCountShowFilmAdd={() => {}}
            onPlayClick={handlePlayClick}
          />
        </Provider>
    );

    const playButton = main.find(`.btn--play`);
    playButton.simulate(`click`, film);
    expect(handlePlayClick).toHaveBeenCalledWith(film);
  });
});
