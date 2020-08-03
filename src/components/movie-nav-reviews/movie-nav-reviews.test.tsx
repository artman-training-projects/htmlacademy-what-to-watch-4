import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history';
import {comments, moviePoster, noop} from '../data-test-set';
import {MovieNavReviews} from './movie-nav-reviews';
import NameSpace from '../../reducer/name-space';

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
              comments={comments}
              loadComments={noop}
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
              comments={comments}
              loadComments={noop}
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
              comments={comments}
              loadComments={noop}
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
