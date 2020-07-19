import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {films} from '../data-for-test.js';
import SmallMovieCard from './small-movie-card.jsx';
import withVideo from '../../hoc/with-video/with-video.jsx';

const SmallMovieCardWrapped = withVideo(SmallMovieCard);

const film = films[0];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard`, () => {
  const handleMouseClick = jest.fn();

  const main = shallow(
      <SmallMovieCard
        film={film}
        isPlaying={false}
        onIsPlayingChange={() => {}}
        onSmallMovieCardClick={handleMouseClick}
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

describe(`SmallMovieCard with-video HOC`, () => {
  const handleIsPlayingChange = jest.fn();

  const initialState = {
    isPlaying: false,
  };

  const main = mount(
      <SmallMovieCardWrapped
        film={film}
        isPlaying={false}
        onIsPlayingChange={handleIsPlayingChange}
        onSmallMovieCardClick={() => {}}
      />
  );

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.load = () => {};
  main.setState(initialState);

  it(`Init with initialState`, () => {
    expect(main.state()).toEqual(initialState);
  });

  it(`Change isPlaying state onMouseEnter`, () => {
    const movieCard = main.find(`.small-movie-card`);
    movieCard.props().onMouseEnter(handleIsPlayingChange(), main.setState({
      isPlaying: true,
    }));
    expect(main.state().isPlaying).toEqual(true);
  });

  it(`Change isPlaying state onMouseLeave`, () => {
    const movieCard = main.find(`.small-movie-card`);
    movieCard.props().onMouseLeave(handleIsPlayingChange(), main.setState({
      isPlaying: false,
    }));
    expect(main.state().isPlaying).toEqual(false);
  });
});
