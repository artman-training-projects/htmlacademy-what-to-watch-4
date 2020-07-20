import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import SighIn from './sign-in.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`SignIn`, () => {
  it(`Render, no error autorization`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: `/sign-in`,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <SighIn />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render, is error autorization`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: `/sign-in`,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: true,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <SighIn />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
