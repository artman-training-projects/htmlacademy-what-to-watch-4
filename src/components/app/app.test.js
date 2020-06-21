import React from 'react';
import renderer from 'react-test-renderer';
import {films, moviePoster} from '../data-for-test.js';
import App from './app.jsx';

describe(`App`, () => {
  it(`Render App`, () => {
    const tree = renderer.create(
        <App
          films = {films}
          moviePoster = {moviePoster}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
