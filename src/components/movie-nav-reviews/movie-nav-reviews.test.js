import React from 'react';
import renderer from 'react-test-renderer';
import MovieNavReviews from './movie-nav-reviews.jsx';
import {comments} from '../data-for-test.js';

describe(`MovieNavReviews`, () => {
  it(`Render MovieNavReviews`, () => {
    const tree = renderer.create(
        <MovieNavReviews
          reviews={comments}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
