import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {Pages} from '../../const.js';
import {films} from '../data-for-test.js';
import VideoPlayerFull from './video-player-full.jsx';
import NameSpace from '../../reducer/name-space.js';

const film = films[0];
const mockStore = configureStore([]);

describe(`VideoPlayerFull`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MAIN,
    }
  });

  it(`Render VideoPlayerFull onPlay`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <VideoPlayerFull
            currentTime={20}
            duration={100}
            film={film}
            isPlaying={true}
            leftTime={`00:10:12`}
            onClosePlayerClick={() => {}}
            onIsPlayingChange={() => {}}
            onSetFullScreen={() => {}}
          ><video/>
          </VideoPlayerFull>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render VideoPlayerFull onPause`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <VideoPlayerFull
            currentTime={20}
            duration={100}
            film={film}
            isPlaying={false}
            leftTime={`00:10:12`}
            onClosePlayerClick={() => {}}
            onIsPlayingChange={() => {}}
            onSetFullScreen={() => {}}
          ><video/>
          </VideoPlayerFull>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
