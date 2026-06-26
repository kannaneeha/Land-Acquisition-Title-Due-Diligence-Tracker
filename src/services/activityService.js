import api from './api.js';
import { addActivityLog as localAdd, getActivityLog as localGet } from '../utils/activity.js';

export const activityService = {
  getAll: async () => {
    try {
      const data = await api.get('/activity').then((r) => r.data);
      return data;
    } catch {
      return localGet();
    }
  },

  create: async (action, user) => {
    try {
      return await api.post('/activity', { action }).then((r) => r.data);
    } catch {
      return localAdd(user, action);
    }
  },
};
