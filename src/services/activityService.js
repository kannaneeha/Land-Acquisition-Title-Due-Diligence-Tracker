import { getActivityLog } from '../utils/activity.js';

export const activityService = {
  getAll: () => Promise.resolve(getActivityLog()),
};
