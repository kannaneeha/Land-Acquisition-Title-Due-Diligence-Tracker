import { addActivityLog } from '../utils/activity.js';
import { roleLabels } from '../utils/rbac.js';
import { getStoredUsers, saveStoredUsers } from '../utils/users.js';

export const userService = {
  getAll: () => Promise.resolve(getStoredUsers()),
  create: (payload, actor) => {
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
    return Promise.resolve(nextUser);
  },
  update: (employeeId, payload, actor) => {
    const users = getStoredUsers();
    const nextUsers = users.map((user) => (
      user.employeeId === employeeId ? { ...user, ...payload, roleLabel: roleLabels[payload.role || user.role] } : user
    ));
    saveStoredUsers(nextUsers);
    addActivityLog(actor, `User Updated: ${employeeId}`);
    return Promise.resolve(nextUsers.find((user) => user.employeeId === employeeId));
  },
  disable: (employeeId, actor) => {
    const users = getStoredUsers();
    const nextUsers = users.map((user) => (user.employeeId === employeeId ? { ...user, status: 'INACTIVE' } : user));
    saveStoredUsers(nextUsers);
    addActivityLog(actor, `User Disabled: ${employeeId}`);
    return Promise.resolve(true);
  },
  resetPassword: (employeeId, actor) => {
    const users = getStoredUsers();
    const nextUsers = users.map((user) => (user.employeeId === employeeId ? { ...user, password: 'Reset@123', failedAttempts: 0, lockedUntil: null } : user));
    saveStoredUsers(nextUsers);
    addActivityLog(actor, `Password Reset: ${employeeId}`);
    return Promise.resolve(true);
  },
};
