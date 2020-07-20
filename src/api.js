import axios from 'axios';

const RequestCodes = {
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
};

const ENTRY_POINT = `https://4.react.pages.academy/wtw`;
const REQUEST_TIMEOUT = 5000;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: ENTRY_POINT,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    const {response} = err;

    if (response.status === RequestCodes.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);
  return api;
};
