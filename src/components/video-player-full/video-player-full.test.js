import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {films} from '../data-for-test.js';
import VideoPlayerFull from './video-player-full.jsx';

const film = films[0];
const mockStore = configureStore([]);

describe(`VideoPlayerFull`, () => {
  const store = mockStore({
    currentPage: `/`,
  });

  it(`Render VideoPlayerFull`, () => {
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
});
