import axios from 'axios';
//import store from '../redux/store';

export const BASE_URL = import.meta.env.VITE_API_BASE_PATH;
export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    return config
    /* eslint-disable functional/immutable-data */
    // const token = store.getState().user.user.sessionToken;
    // if (token && config.headers) {
    //   config.headers.Authorization = 'Bearer ' + token;
    // }
    // return config;
  },
  (error) => Promise.reject(error)
);
