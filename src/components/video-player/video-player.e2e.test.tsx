import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player';
import {films} from '../data-test-set';

const film = films[0];

configure({adapter: new Adapter()});

describe(`VideoPlayer`, () => {
  it(`Should VideoPlayer play`, () => {
    const videoPlayer = mount(
        <VideoPlayer
          muted
          isPlaying={true}
          poster={film.poster}
          src={film.src}
        />
    );

    const isPlay = videoPlayer.instance().props.isPlaying;
    expect(isPlay).toBe(true);
  });

  it(`Should VideoPlayer stop`, () => {
    const videoPlayer = mount(
        <VideoPlayer
          muted
          isPlaying={false}
          poster={film.poster}
          src={film.src}
        />
    );

    const isStop = videoPlayer.instance().props.isPlaying;
    expect(isStop).toBe(false);
  });
});
