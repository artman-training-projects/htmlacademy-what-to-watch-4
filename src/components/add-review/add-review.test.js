import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {Pages} from '../../const.js';
import {films} from '../data-for-test.js';
import AddReview from './add-review.jsx';
import NameSpace from '../../reducer/name-space.js';

const film = films[0];

const mockStore = configureStore([]);

describe(`AddReview`, () => {
  it(`Render send review ok`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: Pages.REVIEW,
      },
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
        sendCommentError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <AddReview
            film={film}
            onChangeComment={() => {}}
            onChangeRating={() => {}}
            onSubmitReview={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render send review error`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: Pages.REVIEW,
      },
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
        sendCommentError: true,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <AddReview
            film={film}
            onChangeComment={() => {}}
            onChangeRating={() => {}}
            onSubmitReview={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render sending review in process`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: Pages.REVIEW,
      },
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
        sendCommentError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <AddReview
            film={film}
            onChangeComment={() => {}}
            onChangeRating={() => {}}
            onSubmitReview={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
