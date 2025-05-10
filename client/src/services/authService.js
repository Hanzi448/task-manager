import api from './api';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  const res = await api.post(`${API_URL}/register`, userData);  
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await api.post(`${API_URL}/login`, userData);
  return res.data;
};
