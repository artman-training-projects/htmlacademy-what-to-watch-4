import React from 'react';
import renderer from 'react-test-renderer';
import {films} from '../data-for-test.js';
import SmallMovieCard from './small-movie-card.jsx';

const film = films[0];

describe(`SmallMovieCard`, () => {
  it(`Render SmallMovieCard`, () => {
    const tree = renderer.create(
        <SmallMovieCard
          film = {film}
          onSmallMovieCardTitleClick = {() => {}}
          onMouseHover = {() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
