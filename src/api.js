import axios from "axios";
import {URL} from "./const";

const RequestCodes = {
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `${URL}/wtw`,
    timeout: 5000,
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
