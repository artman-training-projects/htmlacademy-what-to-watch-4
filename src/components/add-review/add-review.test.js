import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
import {moviePoster} from '../data-for-test.js';
import AddReview from './add-review.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`AddReview`, () => {
  it(`Render send review ok`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        authorizationError: false,
        user: {
          id: 0,
          email: ``,
          name: ``,
          avatarSrc: ``,
        },
      },
      [NameSpace.DATA]: {
        sendingComment: false,
        sendCommentDone: false,
        sendCommentError: false,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              selectedFilm={moviePoster}
              onChangeComment={() => {}}
              onChangeRating={() => {}}
              onFilmClick={() => {}}
              onSubmitReview={() => {}}
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

  it(`Render send review error`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        authorizationError: false,
        user: {
          id: 0,
          email: ``,
          name: ``,
          avatarSrc: ``,
        },
      },
      [NameSpace.DATA]: {
        sendingComment: true,
        sendCommentDone: false,
        sendCommentError: true,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              selectedFilm={moviePoster}
              onChangeComment={() => {}}
              onChangeRating={() => {}}
              onFilmClick={() => {}}
              onSubmitReview={() => {}}
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

  it(`Render sending review in process`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        authorizationError: false,
        user: {
          id: 0,
          email: ``,
          name: ``,
          avatarSrc: ``,
        },
      },
      [NameSpace.DATA]: {
        sendingComment: true,
        sendCommentDone: false,
        sendCommentError: false,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              selectedFilm={moviePoster}
              onChangeComment={() => {}}
              onChangeRating={() => {}}
              onFilmClick={() => {}}
              onSubmitReview={() => {}}
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
