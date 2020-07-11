import React from 'react';
import renderer from 'react-test-renderer';
import MovieNavDetails from './movie-nav-details.jsx';
import {films} from '../data-for-test.js';

const film = films[0];

describe(`MovieNavDetails`, () => {
  it(`Render MovieNavDetails`, () => {
    const tree = renderer.create(
        <MovieNavDetails
          director={film.director}
          genre={film.genre}
          starring={film.starring}
          time={film.time}
          year={film.year}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
