import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';
const API = axios.create({
    baseURL: API_URL, // Make sure :8001 is here
});
export const getFeaturedProject = () => API.get('/projects/featured');
export const allProjects = () => API.get('/projects');
export const getProjects = (params) => API.get('/projects', { params });
