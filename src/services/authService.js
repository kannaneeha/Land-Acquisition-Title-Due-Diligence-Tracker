import { addActivityLog, seedActivityLog } from '../utils/activity.js';
import api from './api.js';
import { passwordMeetsPolicy } from '../utils/rbac.js';
import { getStoredUsers, saveStoredUsers } from '../utils/users.js';

const LOCK_DURATION_MS = 15 * 60 * 1000;

export const authService = {
  async login({ employeeId, username, password, role }) {
    if (!employeeId || !username || !password || !role) {
      throw new Error('Employee ID, role, username, and password are required.');
    }

    const normalizedEmployeeId = employeeId.trim().toUpperCase();
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedRole = role.trim();

    try {
      const response = await api.post('/login', {
        employeeId: normalizedEmployeeId,
        username: normalizedUsername,
        password,
        role: normalizedRole,
      });

      const { token, user } = response.data;
      const sessionUser = {
        ...user,
        name: user.username,
        roleLabel: user.role,
        organization: 'Crownridge LLP',
        token,
      };

      localStorage.setItem('crownridge_token', token);
      localStorage.setItem('crownridge_auth_user', JSON.stringify(sessionUser));
      return sessionUser;
    } catch (error) {
      const users = getStoredUsers();
      const accountIndex = users.findIndex(
        (user) =>
          user.employeeId?.toUpperCase() === normalizedEmployeeId &&
          user.username?.toLowerCase() === normalizedUsername &&
          user.role === normalizedRole,
      );
      const account = users[accountIndex];

      if (!account) {
        throw new Error('Employee ID does not match an active Crownridge account.');
      }

      if (account.lockedUntil && new Date(account.lockedUntil) > new Date()) {
        throw new Error('Account is locked for 15 minutes after repeated failed attempts.');
      }

      if (account.status !== 'ACTIVE') {
        throw new Error(`Account status is ${account.status}. Only ACTIVE users can login.`);
      }

      const valid = account.username === username && account.password === password && account.role === role;
      if (!valid) {
        const failedAttempts = (account.failedAttempts || 0) + 1;
        const lockedUntil = failedAttempts >= 5 ? new Date(Date.now() + LOCK_DURATION_MS).toISOString() : null;
        users[accountIndex] = { ...account, failedAttempts, lockedUntil };
        saveStoredUsers(users);
        throw new Error(failedAttempts >= 5 ? 'Account locked for 15 minutes after 5 failed attempts.' : 'Login details do not match the selected role.');
      }

      const lastLogin = new Date().toISOString();
      const sessionUser = {
        employeeId: account.employeeId,
        username: account.username,
        name: account.username,
        role: account.role,
        roleLabel: account.roleLabel,
        status: account.status,
        lastLogin,
        organization: 'Crownridge LLP',
      };
      users[accountIndex] = { ...account, failedAttempts: 0, lockedUntil: null, lastLogin };
      saveStoredUsers(users);
      seedActivityLog(sessionUser);
      addActivityLog(sessionUser, 'User Login');
      return sessionUser;
    }
  },
  validateStrongPassword: passwordMeetsPolicy,
};
