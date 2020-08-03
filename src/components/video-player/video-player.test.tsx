import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VideoPlayer from './video-player';
import {films} from '../data-test-set';

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

