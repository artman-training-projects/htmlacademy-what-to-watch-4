import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
import {user} from '../data-for-test.js';
import Header from './header.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`Header`, () => {
  it(`Render, no login`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
        authorizationInProgress: false,
        user: {
          id: 0,
          email: ``,
          name: ``,
          avatarSrc: ``,
        },
      }
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Header
              onSignInClick={() => {}}
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

  it(`Render, is login`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        authorizationError: false,
        authorizationInProgress: false,
        user,
      }
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Header
              onSignInClick={() => {}}
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
