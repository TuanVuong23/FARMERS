import axios from 'axios';

const api = axios.create({
  baseURL: 'http://100.99.67.126:8082',
});

export default api;