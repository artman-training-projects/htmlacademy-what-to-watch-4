import userAdapter from '../../adapter/user.js';
import {extend} from '../utils.js';
import {AuthorizationStatus} from '../../const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationError: false,
  user: {
    id: 0,
    email: ``,
    name: ``,
    avatarSrc: ``,
  },
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  ERROR_AUTHORIZATION: `SET_ERROR`,
  SET_USER_DATA: `SET_USER_DATA`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  errorAuthorization: (error) => {
    return {
      type: ActionType.ERROR_AUTHORIZATION,
      payload: error,
    };
  },

  setUserData: (userData) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: userData,
    };
  },
};

const Operations = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((responce) => {
        dispatch(ActionCreator.errorAuthorization(false));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(userAdapter(responce.data)));
      })
      .catch((err) => {
        dispatch(ActionCreator.errorAuthorization(true));
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then((responce) => {
      dispatch(ActionCreator.errorAuthorization(false));
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setUserData(userAdapter(responce.data)));
    })
    .catch((err) => {
      dispatch(ActionCreator.errorAuthorization(true));
      throw err;
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.ERROR_AUTHORIZATION:
      return extend(state, {
        authorizationError: action.payload,
      });

    case ActionType.SET_USER_DATA:
      return extend(state, {
        user: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operations, reducer};
