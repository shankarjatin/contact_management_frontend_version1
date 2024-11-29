import axios from 'axios';

const API_URL = 'https://contact-manager-backend-2.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData) => api.post('/users/register', userData);
export const login = (credentials) => api.post('/users/login', credentials);
export const getContacts = () => api.get('/contacts');
export const getContact = (id) => api.get(`/contacts/${id}`);
export const createContact = (contact) => api.post('/contacts', contact);
export const updateContact = (id, contact) => api.put(`/contacts/${id}`, contact);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);