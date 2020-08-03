import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MovieNavDetails from './movie-nav-details';
import {films} from '../data-test-set';

const film = films[0];

describe(`MovieNavDetails`, () => {
  it(`Render MovieNavDetails time more hour`, () => {
    const tree = renderer.create(
        <MovieNavDetails
          director={film.director}
          genre={film.genre}
          starring={film.starring}
          time={80}
          year={film.year}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MovieNavDetails time less hour`, () => {
    const tree = renderer.create(
        <MovieNavDetails
          director={film.director}
          genre={film.genre}
          starring={film.starring}
          time={30}
          year={film.year}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MovieNavDetails time less minute`, () => {
    const tree = renderer.create(
        <MovieNavDetails
          director={film.director}
          genre={film.genre}
          starring={film.starring}
          time={0}
          year={film.year}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
