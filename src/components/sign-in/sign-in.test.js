import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import history from '../../history.js';
import SighIn from './sign-in.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`SignIn`, () => {
  it(`Render, no error autorization`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <SighIn />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render, is error autorization`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: true,
      },
    });

    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <SighIn />
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
