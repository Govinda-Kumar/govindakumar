import axios from 'axios';

// Try runtime config first (production), then build-time env, then fallback
const API_URL = 
  (typeof window !== 'undefined' && window.ENV_CONFIG?.VITE_API_URL !== '__VITE_API_URL__') 
    ? window.ENV_CONFIG.VITE_API_URL 
    : import.meta.env.VITE_API_URL || 'http://localhost:8001';

console.log('API_URL configured as:', API_URL);

const API = axios.create({
    baseURL: API_URL,
});

export const getFeaturedProject = () => API.get('/projects/featured');
export const allProjects = () => API.get('/projects');
export const getProjects = (params) => API.get('/projects', { params });
