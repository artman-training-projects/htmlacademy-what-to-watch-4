import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card.jsx';
import {films} from '../data-for-test.js';

const film = films[0];

describe(`SmallMovieCard`, () => {
  it(`Render SmallMovieCard`, () => {
    const tree = renderer.create(
        <SmallMovieCard
          film={film}
          onSmallMovieCardClick={() => {}}
          isPlaying={false}
          setIsPlaying={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
