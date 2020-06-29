import React from 'react';
import renderer from 'react-test-renderer';
import MovieNavReviews from './movie-nav-reviews.jsx';
import {films} from '../data-for-test.js';

const film = films[0];

describe(`MovieNavReviews`, () => {
  it(`Render MovieNavReviews`, () => {
    const tree = renderer.create(
        <MovieNavReviews
          reviews={film.reviews}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
