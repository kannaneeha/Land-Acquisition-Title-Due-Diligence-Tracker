import api from './api.js';

export const reportService = {
  getSummary: () => api.get('/reports/summary').then((response) => response.data),
  getAnalytics: () => api.get('/reports/analytics').then((response) => response.data),
  exportPdf: () => api.get('/reports/export/pdf', { responseType: 'blob' }),
  exportExcel: () => api.get('/reports/export/excel', { responseType: 'blob' }),
};
