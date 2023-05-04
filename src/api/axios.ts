import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEV } from '../utils/const';
import store from '../redux/store';
import { isApiError } from '../utils/api.utils';
import { ApiException } from './exception/ApiException';

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { uid, sessionToken } = store.getState().user.user;
  if (sessionToken && config.headers) {
    config.headers.Authorization = 'Bearer ' + sessionToken;
    if(DEV) {
      config.headers["x-pagopa-pn-uid"] = uid;
    }
    
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => { 
  throw new Error(error.message);
};

const onResponse = (response: AxiosResponse<any, any>) => {
  const { data } = response;
  if(data && isApiError(data)) {
    const { code, message } = data.status;
    throw new ApiException({ code, message });
  }

  return response;
};

const onResponseError = (error: AxiosError<any, any>) => Promise.reject(error);

function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

const apiClientInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = setupInterceptors(apiClientInstance);

