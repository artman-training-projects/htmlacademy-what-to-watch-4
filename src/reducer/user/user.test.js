import {AuthorizationStatus} from '../../const.js';
import {user} from '../../components/data-for-test.js';
import {ActionType, reducer} from './user.js';

describe(`Reducer user`, () => {
  it(`Should return initital state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationError: false,
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


