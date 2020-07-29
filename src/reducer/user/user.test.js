import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';

import {AuthorizationStatus} from '../../const.js';
import {ActionType, Operations, reducer} from './user.js';
import {user} from '../../components/data-for-test.js';

const api = createAPI(() => {});

describe(`Operaions User`, () => {
  it(`Should return checkAuth AUTH`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userCheckAuth = Operations.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return userCheckAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: `AUTH`,
        });
      });
  });
});

describe(`Reducer User`, () => {
  it(`Should return initital state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationError: false,
      authorizationInProgress: false,
      user: {
        id: 0,
        email: ``,
        name: ``,
        avatarSrc: ``,
      },
    });
  });

  it(`Return authorizationStatus after change`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });

  it(`Return authorizationError after change`, () => {
    expect(reducer({
      authorizationError: false,
    }, {
      type: ActionType.ERROR_AUTHORIZATION,
      payload: true,
    })).toEqual({
      authorizationError: true,
    });
  });

  it(`Return user after change`, () => {
    expect(reducer({
      user: {
        id: 0,
        email: ``,
        name: ``,
        avatarSrc: ``,
      },
    }, {
      type: ActionType.SET_USER_DATA,
      payload: user,
    })).toEqual({
      user,
    });
  });
});


