import NameSpace from '../name-space.js';

export const getAuthStatus = (state) => ({
  status: state[NameSpace.USER].authorizationStatus,
  error: state[NameSpace.USER].authorizationError,
  isProgress: state[NameSpace.USER].authorizationInProgress,
});

export const getUserData = (state) => state[NameSpace.USER].user;
