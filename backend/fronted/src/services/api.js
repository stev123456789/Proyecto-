import axios from 'axios';

const getBackendIP = () => localStorage.getItem('backendIP') || 'localhost';
const getBaseURL = () => `http://${getBackendIP()}:8000/api/`;

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setBackendIP = (ip) => {
  const backendIP = (ip || 'localhost').trim();
  localStorage.setItem('backendIP', backendIP);
  api.defaults.baseURL = `http://${backendIP}:8000/api/`;
};

export const setAuthToken = (token, refreshToken) => {
  localStorage.setItem('access_token', token);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete api.defaults.headers.common.Authorization;
};

export const isLoggedIn = () => \!\!localStorage.getItem('access_token');

export default api;
