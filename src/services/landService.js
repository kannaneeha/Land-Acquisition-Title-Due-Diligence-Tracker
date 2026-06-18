import api from './api.js';

const resource = '/land-records';

export const landService = {
  getAll: () => api.get(resource).then((response) => response.data),
  getById: (id) => api.get(`${resource}/${id}`).then((response) => response.data),
  create: (payload) => api.post(resource, payload).then((response) => response.data),
  update: (id, payload) => api.put(`${resource}/${id}`, payload).then((response) => response.data),
  remove: (id) => api.delete(`${resource}/${id}`).then((response) => response.data),
};
