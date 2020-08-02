import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {films} from '../data-test-set';
import VideoPlayerFull from './video-player-full';

describe(`VideoPlayerFull`, () => {
  it(`Render VideoPlayerFull onPlay`, () => {
    const tree = renderer.create(
        <VideoPlayerFull
          currentTime={20}
          duration={100}
          isPlaying={true}
          leftTime={`00:10:12`}
          onIsPlayingChange={() => {}}
          onSetFullScreen={() => {}}
          selectedFilm={films[0]}
        >
          <video/>
        </VideoPlayerFull>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render VideoPlayerFull onPause`, () => {
    const tree = renderer.create(
        <VideoPlayerFull
          currentTime={20}
          duration={100}
          isPlaying={false}
          leftTime={`00:10:12`}
          onIsPlayingChange={() => {}}
          onSetFullScreen={() => {}}
          selectedFilm={films[0]}
        >
          <video/>
        </VideoPlayerFull>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
