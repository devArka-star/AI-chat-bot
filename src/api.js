import axios from 'axios';

const api = axios.create({
  // Use process.env for Create React App
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default api;