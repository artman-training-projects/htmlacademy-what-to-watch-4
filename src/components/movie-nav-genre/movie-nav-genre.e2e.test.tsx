import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {films, noop} from '../data-test-set';
import MovieNavGenre from './movie-nav-genre';

configure({adapter: new Adapter()});

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
          onResetShowClick={noop}
        />
    );

    const buttonGenre = movieNavGenre.find(`.catalog__genres-item`);
    buttonGenre.forEach((genre) => genre.simulate(`click`));
    expect(hadleGenreClick.mock.calls.length).toBe(MovieGenreList.length);
  });
});
