import * as React from 'react';
import {Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history';
import {noop, user} from '../data-test-set';
import Header from './header';
import NameSpace from '../../reducer/name-space';

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
              onSignInClick={noop}
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
              onSignInClick={noop}
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
