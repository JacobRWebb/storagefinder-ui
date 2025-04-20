import axios, { AxiosError, AxiosResponse } from "axios";

// You can set your API base URL here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token if available
import type { InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from '../store/useAuthStore';

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);



// Response interceptor: Handle errors globally
import { queryClient } from '../lib/react-query';

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Clear Zustand auth state and Tanstack Query cache, then redirect
      useAuthStore.getState().clearAuth();
      queryClient.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default apiClient;
