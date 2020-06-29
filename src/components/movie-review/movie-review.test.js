import React from 'react';
import renderer from 'react-test-renderer';
import MovieReview from './movie-review.jsx';
import {films} from '../data-for-test.js';

const review = films[0].reviews[0];

describe(`MovieReview`, () => {
  it(`Render MovieReview`, () => {
    const tree = renderer.create(
        <MovieReview
          review={review}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
