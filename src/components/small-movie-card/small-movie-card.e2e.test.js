import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {films} from '../data-for-test.js';
import SmallMovieCard from './small-movie-card.jsx';

const film = films[0];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard`, () => {
  it(`Should SmallMovieCard hovered`, () => {
    const onMouseOver = jest.fn();

    const main = shallow(
        <SmallMovieCard
          film = {film}
          onMouseHover = {onMouseOver}
          onSmallMovieCardTitleClick = {() => {}}
        />
    );

    const movieCard = main.find(`.small-movie-card`);
    movieCard.simulate(`mouseenter`, film);
    expect(onMouseOver).toHaveBeenCalledWith(film);
  });
});
