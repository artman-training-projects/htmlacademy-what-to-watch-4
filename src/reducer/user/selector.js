import NameSpace from '../name-space.js';

export const getAuthStatus = (state) => state[NameSpace.USER].authorizationStatus;

export const getAuthError = (state) => state[NameSpace.USER].authorizationError;

export const getUserData = (state) => state[NameSpace.USER].user;
