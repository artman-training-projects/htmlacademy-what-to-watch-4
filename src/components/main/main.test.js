import React from 'react';
import renderer from 'react-test-renderer';
import {films, moviePoster} from '../data-for-test.js';
import Main from './main.jsx';

describe(`Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer.create(
        <Main
          films = {films}
          moviePoster = {moviePoster}
          onSmallMovieCardTitleClick = {() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
