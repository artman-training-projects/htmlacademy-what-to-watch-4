import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
import {comments, moviePoster} from '../data-for-test.js';
import {MovieNavReviews} from './movie-nav-reviews.jsx';
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
      [NameSpace.SHOW]: {
        selectedFilm: moviePoster,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieNavReviews
              loadComments={() => {}}
              loadingComments={{
                commentsIsLoading: false,
                loadingIsError: false,
              }}
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
      [NameSpace.SHOW]: {
        selectedFilm: moviePoster,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieNavReviews
              loadComments={() => {}}
              loadingComments={{
                commentsIsLoading: true,
                loadingIsError: false,
              }}
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
      [NameSpace.SHOW]: {
        selectedFilm: moviePoster,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MovieNavReviews
              loadComments={() => {}}
              loadingComments={{
                commentsIsLoading: true,
                loadingIsError: true,
              }}
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
