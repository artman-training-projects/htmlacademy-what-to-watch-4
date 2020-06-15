import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main.jsx';
import {MoviePoster, films} from '../../const.js';

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          movieTitle = {MoviePoster.TITLE}
          movieGenre = {MoviePoster.GENRE}
          movieYear = {MoviePoster.YEAR}
          films = {films}
          onSmallMovieCardTitleClick = {() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
