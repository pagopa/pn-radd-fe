import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEV } from '../utils/const';
import store from '../redux/store';
import { ApiException } from './exception/ApiException';

const isApiError = (response: AxiosResponse<any, any>) =>  response.data?.status?.code !== undefined && response.data?.status?.code !== 0 && response.data?.status?.code !== 2;

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
  if(isApiError(response)) {
    throw new ApiException({ code: response.data.status.code, message: response.data.status.message });
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

