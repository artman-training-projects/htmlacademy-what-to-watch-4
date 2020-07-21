import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {films} from '../data-for-test.js';
import MovieNavGenre from './movie-nav-genre.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const MovieGenreList = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];

describe(`MovieNavGenre`, () => {
  it(`Should clicked on genre`, () => {
    const hadleGenreClick = jest.fn();

    const movieNavGenre = mount(
        <MovieNavGenre
          currentGenre={`All genres`}
          films={films}
          genres={MovieGenreList}
          onGenreClick={hadleGenreClick}
          onResetShowClick={() => {}}
        />
    );

    const buttonGenre = movieNavGenre.find(`.catalog__genres-item`);
    buttonGenre.forEach((genre) => genre.simulate(`click`));
    expect(hadleGenreClick.mock.calls.length).toBe(MovieGenreList.length);
  });
});
