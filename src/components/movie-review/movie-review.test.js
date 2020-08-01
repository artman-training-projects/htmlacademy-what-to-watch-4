import * as React from 'react';
import renderer from 'react-test-renderer';
import MovieReview from './movie-review';
import {comments} from '../data-for-test';

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
