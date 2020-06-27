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
          starring={film.starring}
          time={film.time}
          genre={film.genre}
          year={film.year}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
