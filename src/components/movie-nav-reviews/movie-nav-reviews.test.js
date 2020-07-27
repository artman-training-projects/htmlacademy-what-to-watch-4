import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
import {comments} from '../data-for-test.js';
import MovieNavReviews from './movie-nav-reviews.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`MovieNavReviews`, () => {
  it(`Render MovieNavReviews with comments`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        comments,
        loadingComments: false,
        loadCommentsError: false,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieNavReviews
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MovieNavReviews with comments loading`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        comments,
        loadingComments: true,
        loadCommentsError: false,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieNavReviews
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MovieNavReviews with comments loading error`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        comments,
        loadingComments: true,
        loadCommentsError: true,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieNavReviews
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
