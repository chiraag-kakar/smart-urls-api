import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create();

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;