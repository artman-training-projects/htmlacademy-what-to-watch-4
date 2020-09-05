import * as React from 'react';
import {HashRouter} from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import MoviesList from './movies-list';
import {films, history} from '../data-test-set';

describe(`MoviesList`, () => {
  it(`Render MoviesList`, () => {
    const tree = renderer.create(
        <HashRouter>
          <MoviesList
            films={films}
            history={history}
          />
        </HashRouter>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
