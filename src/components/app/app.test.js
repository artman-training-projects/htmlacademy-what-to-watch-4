import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';
import {MoviePoster, films} from '../../const.js';

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          movieTitle = {MoviePoster.TITLE}
          movieGenre = {MoviePoster.GENRE}
          movieYear = {MoviePoster.YEAR}
          films = {films}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
