import userAdapter from '../../adapter/user';
import {extend} from '../utils';
import {AuthorizationStatus} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationError: false,
  authorizationInProgress: false,
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
  SET_PROGRESS_STATUS: `SET_PROGRESS_STATUS`,
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

  setProgressStatus: (status) => {
    return {
      type: ActionType.SET_PROGRESS_STATUS,
      payload: status,
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
    dispatch(ActionCreator.setProgressStatus(true));
    return api.get(`/login`)
      .then((responce) => {
        dispatch(ActionCreator.errorAuthorization(false));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(userAdapter(responce.data)));
        dispatch(ActionCreator.setProgressStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.setProgressStatus(false));
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setProgressStatus(true));
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then((responce) => {
      dispatch(ActionCreator.errorAuthorization(false));
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setUserData(userAdapter(responce.data)));
      dispatch(ActionCreator.setProgressStatus(false));
    })
    .catch((err) => {
      dispatch(ActionCreator.errorAuthorization(true));
      dispatch(ActionCreator.setProgressStatus(false));
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

    case ActionType.SET_PROGRESS_STATUS:
      return extend(state, {
        authorizationInProgress: action.payload,
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
