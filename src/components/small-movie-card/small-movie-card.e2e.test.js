import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from './small-movie-card.jsx';

const film = {
  title: `We need to talk about Kevin`,
  poster: `img/we-need-to-talk-about-kevin.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard`, () => {
  it(`Should SmallMovieCard hovered`, () => {
    const onMouseOver = jest.fn();

    const main = shallow(
        <SmallMovieCard
          film = {film}
          onSmallMovieCardTitleClick = {() => {}}
          onMouseOver = {onMouseOver}
        />
    );

    const movieCard = main.find(`.small-movie-card`);
    movieCard.simulate(`mouseover`, film);
    expect(onMouseOver).toHaveBeenCalled();
  });
});
