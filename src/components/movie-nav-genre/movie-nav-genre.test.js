import React from 'react';
import renderer from 'react-test-renderer';
import MovieNavGenre from './movie-nav-genre.jsx';
import {films} from '../data-for-test.js';

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
          films={films}
          genres={MovieGenreList}
          currentGenre={MovieGenreList[0]}
          onGenreClick={() => {}}
          onResetShowClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
