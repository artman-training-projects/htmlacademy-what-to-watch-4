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
  const handleMouseClick = jest.fn();

  const main = shallow(
      <SmallMovieCard
        film={film}
        onSmallMovieCardClick={handleMouseClick}
        isPlaying={false}
        onIsPlayingChange={() => {}}
      />
  );

  it(`Should SmallMoviePoster clicked`, () => {
    const moviePoster = main.find(`.small-movie-card__image`);
    moviePoster.parent().simulate(`click`, film);
    expect(handleMouseClick).toHaveBeenCalledWith(film);
  });

  it(`Should SmallMovieTitle clicked`, () => {
    const movieTitle = main.find(`.small-movie-card__title`);
    movieTitle.parent().simulate(`click`, film);
    expect(handleMouseClick).toHaveBeenCalledWith(film);
  });
});
