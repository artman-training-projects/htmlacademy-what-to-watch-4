import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';
import {films} from '../data-for-test.js';

const film = films[0];

describe(`VideoPlayer`, () => {
  it(`Render VideoPlayer`, () => {
    const tree = renderer.create(
        <VideoPlayer muted
          isPlaying = {false}
          poster = {film.poster}
          src = {film.previewSrc}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

