import api from './api.js';
import { addActivityLog } from '../utils/activity.js';
import { roleLabels } from '../utils/rbac.js';
import { getStoredUsers, saveStoredUsers } from '../utils/users.js';

const toFrontendFormat = (doc) => ({
  ...doc,
  id: doc._id || doc.employeeId,
  roleLabel: roleLabels[doc.role] || doc.role,
});

export const userService = {
  getAll: async () => {
    try {
      const data = await api.get('/users').then((r) => r.data);
      return data.map(toFrontendFormat);
    } catch {
      return getStoredUsers();
    }
  },

  create: async (payload, actor) => {
    try {
      const data = await api.post('/users', payload).then((r) => r.data);
      return toFrontendFormat(data);
    } catch {
      const users = getStoredUsers();
      const nextUser = {
        ...payload,
        roleLabel: roleLabels[payload.role],
        status: payload.status || 'ACTIVE',
        failedAttempts: 0,
        lockedUntil: null,
        lastLogin: '',
      };
      saveStoredUsers([nextUser, ...users]);
      addActivityLog(actor, `User Created: ${payload.employeeId}`);
      return nextUser;
    }
  },

  update: async (id, payload, actor) => {
    try {
      const data = await api.put(`/users/${id}`, payload).then((r) => r.data);
      return toFrontendFormat(data);
    } catch {
      const users = getStoredUsers();
      const nextUsers = users.map((user) =>
        (user.employeeId === id || user._id === id) ? { ...user, ...payload, roleLabel: roleLabels[payload.role || user.role] } : user,
      );
      saveStoredUsers(nextUsers);
      addActivityLog(actor, `User Updated: ${id}`);
      return nextUsers.find((user) => user.employeeId === id || user._id === id);
    }
  },

  disable: async (id, actor) => {
    try {
      await api.put(`/users/${id}`, { status: 'INACTIVE' });
    } catch {
      const users = getStoredUsers();
      const nextUsers = users.map((user) => (user.employeeId === id || user._id === id ? { ...user, status: 'INACTIVE' } : user));
      saveStoredUsers(nextUsers);
      addActivityLog(actor, `User Disabled: ${id}`);
    }
  },

  resetPassword: async (id, actor) => {
    try {
      await api.put(`/users/${id}`, { password: 'Reset@123' });
    } catch {
      const users = getStoredUsers();
      const nextUsers = users.map((user) =>
        (user.employeeId === id || user._id === id) ? { ...user, password: 'Reset@123', failedAttempts: 0, lockedUntil: null } : user,
      );
      saveStoredUsers(nextUsers);
      addActivityLog(actor, `Password Reset: ${id}`);
    }
  },
};
