import { roleLabels, ROLES } from './rbac.js';

export const USER_STORAGE_KEY = 'crownridge_users';

export const sampleUsers = [
  {
    employeeId: 'ADM001',
    username: 'admin',
    password: 'admin123',
    role: ROLES.ADMIN,
    roleLabel: roleLabels.ADMIN,
    status: 'ACTIVE',
    failedAttempts: 0,
    lockedUntil: null,
    lastLogin: '',
  },
  {
    employeeId: 'OFF001',
    username: 'officer',
    password: 'officer123',
    role: ROLES.OFFICER,
    roleLabel: roleLabels.OFFICER,
    status: 'ACTIVE',
    failedAttempts: 0,
    lockedUntil: null,
    lastLogin: '',
  },
  {
    employeeId: 'LEG001',
    username: 'legal',
    password: 'legal123',
    role: ROLES.LEGAL,
    roleLabel: roleLabels.LEGAL,
    status: 'ACTIVE',
    failedAttempts: 0,
    lockedUntil: null,
    lastLogin: '',
  },
  {
    employeeId: 'PM001',
    username: 'pm',
    password: 'pm123',
    role: ROLES.PM,
    roleLabel: roleLabels.PM,
    status: 'ACTIVE',
    failedAttempts: 0,
    lockedUntil: null,
    lastLogin: '',
  },
  {
    employeeId: 'DIR001',
    username: 'director',
    password: 'director123',
    role: ROLES.DIRECTOR,
    roleLabel: roleLabels.DIRECTOR,
    status: 'ACTIVE',
    failedAttempts: 0,
    lockedUntil: null,
    lastLogin: '',
  },
];

export function getStoredUsers() {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sampleUsers));
    return sampleUsers;
  }
  return JSON.parse(stored);
}

export function saveStoredUsers(users) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}
