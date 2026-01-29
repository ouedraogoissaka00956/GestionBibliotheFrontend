// ============================================
// src/api/ CategoryApi.js
// ============================================

// Import the configured axios instance
import api from './axios';

export const  CategoryApi = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};