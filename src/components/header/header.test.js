import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from './header.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`Header`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: `/`,
    }
  });

  it(`Render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Header />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
