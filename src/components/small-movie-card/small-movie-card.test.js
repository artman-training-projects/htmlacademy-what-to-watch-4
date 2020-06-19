import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card.jsx';

const film = {
  title: `We need to talk about Kevin`,
  poster: `img/we-need-to-talk-about-kevin.jpg`,
};

describe(`SmallMovieCard`, () => {
  it(`Render SmallMovieCard`, () => {
    const tree = renderer
      .create(
          <SmallMovieCard
            film = {film}
            onSmallMovieCardTitleClick = {() => {}}
            onMouseOver = {() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
