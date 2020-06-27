import React from 'react';
import renderer from 'react-test-renderer';
import MovieNavGenre from './movie-nav-genre.jsx';

const MovieGenreList = {
  ALL: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  KIDS: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

describe(`MovieNavGenre`, () => {
  it(`Render MovieNavGenre`, () => {
    const tree = renderer.create(
        <MovieNavGenre
          genres={MovieGenreList}
          currentGenre={MovieGenreList.ALL}
          onGenreClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
