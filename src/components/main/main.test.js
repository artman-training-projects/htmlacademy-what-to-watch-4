import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {films, moviePoster} from '../data-for-test.js';

describe(`Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer.create(
        <Main
          films={films}
          moviePoster={moviePoster}
          onSmallMovieCardClick={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
