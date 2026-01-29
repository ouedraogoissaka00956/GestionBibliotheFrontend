// ============================================
// src/api/bookApi.js
// ============================================
import api from './axios';

export const bookApi = {
  getAll: (params) => api.get('/books', { params }),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
  search: (query) => api.get('/books', { params: { search: query } }),
};