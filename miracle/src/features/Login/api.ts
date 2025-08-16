// api.ts
import axios from 'axios';
import { useAuth } from './AuthContext';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
});

const publicEndpoints = [
  '/login/',
  '/register/',
  '/token/refresh/',
  '/send-otp/',
  '/verify-otp/'
];

api.interceptors.request.use(
  (config) => {
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );
    
    if (!isPublicEndpoint) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      const isPublicEndpoint = publicEndpoints.some(endpoint => 
        originalRequest.url?.includes(endpoint)
      );
      
      if (!isPublicEndpoint) {
        originalRequest._retry = true;
        const { refreshToken } = useAuth();
        
        try {
          const success = await refreshToken();
          if (success) {
            const newToken = localStorage.getItem('access_token');
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (err) {
          console.error('Token refresh failed:', err);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;