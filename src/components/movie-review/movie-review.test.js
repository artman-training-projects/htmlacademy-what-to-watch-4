import React from 'react';
import renderer from 'react-test-renderer';
import MovieReview from './movie-review.jsx';
import {comments} from '../data-for-test.js';

describe(`MovieReview`, () => {
  it(`Render MovieReview`, () => {
    const tree = renderer.create(
        <MovieReview
          review={comments[0]}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
