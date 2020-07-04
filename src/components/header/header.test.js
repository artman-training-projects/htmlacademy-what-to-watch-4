import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe(`Header`, () => {
  const store = mockStore({
    currentPage: `/`,
  });

  it(`Render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Header />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
