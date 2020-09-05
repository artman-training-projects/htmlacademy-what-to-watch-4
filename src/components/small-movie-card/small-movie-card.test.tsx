import * as React from 'react';
import {Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import history from '../../history';
import SmallMovieCard from './small-movie-card';
import {films, noop} from '../data-test-set';

const film = films[0];

describe(`SmallMovieCard`, () => {
  it(`Render SmallMovieCard`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <SmallMovieCard
            film={film}
            isPlaying={false}
            history={history}
            onIsPlayingChange={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
