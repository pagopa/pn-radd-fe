import axios from 'axios';
import { API_BASE_URL, AUTH_API_BASE_URL, DEV } from '../utils/const';
import store from '../redux/store';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: AUTH_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const { uid, sessionToken } = store.getState().user.user;
    if (sessionToken && config.headers) {
      config.headers.Authorization = 'Bearer ' + sessionToken;
      if(DEV) {
        config.headers["x-pagopa-pn-uid"] = uid;
      }
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);
