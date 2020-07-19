import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from './header.jsx';
import NameSpace from '../../reducer/name-space.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`Header`, () => {
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

  it(`Should signIn clicked`, () => {
    const onSignInClick = jest.fn();

    const header = mount(
        <Provider store={store}>
          <Header
            onSignInClick={onSignInClick}
          />
        </Provider>
    );

    const signInLink = header.find(`.user-block__link`);
    signInLink.simulate(`click`);
    expect(onSignInClick).toHaveBeenCalled();
  });
});
