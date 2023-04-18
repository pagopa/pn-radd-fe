import axios from 'axios';
import { API_BASE_URL } from '../utils/const';
//import store from '../redux/store';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    return config
    // const token = store.getState().user.user.sessionToken;
    // if (token && config.headers) {
    //   config.headers.Authorization = 'Bearer ' + token;
    // }
    // return config;
  },
  (error) => Promise.reject(error)
);
