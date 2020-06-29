import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {films, moviePoster} from '../data-for-test.js';


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main`, () => {
  it(`Should movieCardTitle clicked`, () => {
    const handleSmallMovieCardClick = jest.fn();

    const main = mount(
        <Main
          films={films}
          moviePoster={moviePoster}
          onSmallMovieCardClick={handleSmallMovieCardClick}
        />
    );

    const smallMovieCardTitles = main.find(`.small-movie-card__title`);
    smallMovieCardTitles.forEach((cardTitle) => cardTitle.simulate(`click`));
    expect(handleSmallMovieCardClick.mock.calls.length).toBe(films.length);
  });
});
