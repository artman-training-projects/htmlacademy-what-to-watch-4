import * as React from 'react';
import {Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import history from '../../history';
import MoviesList from './movies-list';
import {films} from '../data-test-set';

describe(`MoviesList`, () => {
  it(`Render MoviesList`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MoviesList
            films={films}
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
