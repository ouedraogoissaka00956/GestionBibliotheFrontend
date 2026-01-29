// ============================================
// src/api/loanApi.js
// ============================================
import api from './axios';

export const loanApi = {
  getAll: (params) => api.get('/loans', { params }),
  getById: (id) => api.get(`/loans/${id}`),
  create: (data) => api.post('/loans', data),
  returnBook: (id) => api.put(`/loans/${id}/return`),
  extendLoan: (id, data) => api.put(`/loans/${id}/extend`, data),
  delete: (id) => api.delete(`/loans/${id}`),
};