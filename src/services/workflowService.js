import api from './api.js';

export const workflowService = {
  getAll: () => api.get('/workflows').then((response) => response.data),
  getByRecord: (recordId) => api.get(`/workflows/${recordId}`).then((response) => response.data),
  updateStage: (recordId, stage) => api.patch(`/workflows/${recordId}`, { stage }).then((response) => response.data),
};
