// ============================================
// src/api/memberApi.js
// ============================================
import api from './axios';

export const memberApi = {
  getAll: (params) => api.get('/members', { params }),
  getById: (id) => api.get(`/members/${id}`),
  create: (data) => api.post('/members', data),
  update: (id, data) => api.put(`/members/${id}`, data),
  delete: (id) => api.delete(`/members/${id}`),
  search: (query) => api.get('/members', { params: { search: query } }),
};