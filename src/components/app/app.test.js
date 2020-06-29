import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {films, moviePoster} from '../data-for-test.js';

describe(`App`, () => {
  it(`Render App`, () => {
    const tree = renderer.create(
        <App
          films={films}
          moviePoster={moviePoster}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
