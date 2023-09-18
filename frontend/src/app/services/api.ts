import axios, {AxiosError, AxiosInstance} from 'axios';
import {getToken} from './token';
import { toast } from 'react-toastify';
import { AxiosResponseData } from '../types/error';
import { API_URL, ErrorCode, Messages } from '../constanst/common';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (config) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response 
        && error.response.status >= ErrorCode.BadRequest 
        && error.response.status !== ErrorCode.unauthorized) 
        {
        toast.error((error.response.data as AxiosResponseData).message)
      }
      if (error.response && error.response.status >= ErrorCode.ServerError) {
        toast.error(Messages.ServerError);
      }
    }
  )

  return api;
}
