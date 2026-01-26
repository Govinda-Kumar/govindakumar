import axios from 'axios';
const API = axios.create({
    baseURL: 'http://127.0.0.1:8001', // Make sure :8001 is here
});
export const getFeaturedProject = () => API.get('/projects/featured');
