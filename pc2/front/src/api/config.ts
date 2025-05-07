const isDev = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDev
  ? import.meta.env.VITE_API_URL_DEV || 'http://localhost:8000'
  : import.meta.env.VITE_API_URL_PROD || '';
