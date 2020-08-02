import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MovieNavGenre from './movie-nav-genre';
import {films, noop} from '../data-test-set';

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
  it(`Render MovieNavGenre`, () => {
    const tree = renderer.create(
        <MovieNavGenre
          currentGenre={MovieGenreList[0]}
          films={films}
          genres={MovieGenreList}
          onGenreClick={noop}
          onResetShowClick={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
