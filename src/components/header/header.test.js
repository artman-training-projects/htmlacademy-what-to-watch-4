import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {user} from '../data-for-test.js';
import Header from './header.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`Header`, () => {
  it(`Render, no login`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: `/`,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        user: {
          id: 0,
          email: ``,
          name: ``,
          avatarSrc: ``,
        },
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Header
            onSignInClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render, is login`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: `/`,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        user,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Header
            onSignInClick={() => {}}
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
