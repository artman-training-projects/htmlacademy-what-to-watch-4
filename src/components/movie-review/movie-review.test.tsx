import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MovieReview from './movie-review';
import {comments} from '../data-test-set';

describe(`MovieReview`, () => {
  it(`Render MovieReview`, () => {
    const tree = renderer.create(
        <MovieReview
          comment={comments[0]}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
