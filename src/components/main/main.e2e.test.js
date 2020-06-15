import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';
import {MoviePoster, films} from '../../const.js';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movieCardTitle clicked`, () => {
  const onSmallMovieCardTitleClick = jest.fn();

  const main = shallow(
      <Main
        movieTitle = {MoviePoster.TITLE}
        movieGenre = {MoviePoster.GENRE}
        movieYear = {MoviePoster.YEAR}
        films = {films}
        onSmallMovieCardTitleClick = {onSmallMovieCardTitleClick}
      />
  );

  const smallMovieCardTitles = main.find(`.small-movie-card__title`);
  smallMovieCardTitles.forEach((movieTitle) => movieTitle.props().onClick());
  expect(onSmallMovieCardTitleClick.mock.calls.length).toBe(smallMovieCardTitles.length);
});
