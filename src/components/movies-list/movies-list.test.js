import React from 'react';
import renderer from 'react-test-renderer';
import {films} from '../data-for-test.js';
import MoviesList from './movies-list.jsx';

describe(`MoviesList`, () => {
  it(`Render MoviesList`, () => {
    const tree = renderer.create(
        <MoviesList
          films = {films}
          onSmallMovieCardTitleClick = {() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
