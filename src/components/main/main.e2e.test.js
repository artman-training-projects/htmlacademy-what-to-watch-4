import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {films, moviePoster} from '../data-for-test.js';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main`, () => {
  it(`Should movieCardTitle clicked`, () => {
    const onSmallMovieCardTitleClick = jest.fn();

    const main = shallow(
        <Main
          films = {films}
          moviePoster = {moviePoster}
          onSmallMovieCardTitleClick = {onSmallMovieCardTitleClick}
        />
    );

    const smallMovieCardTitles = main.find(`.small-movie-card__title`);
    smallMovieCardTitles.forEach((cardTitle) => cardTitle.props().onClick());
    expect(onSmallMovieCardTitleClick.mock.calls.length).toBe(smallMovieCardTitles.length);
  });
});
