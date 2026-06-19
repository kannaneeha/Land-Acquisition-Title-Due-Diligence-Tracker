export const ROLES = {
  ADMIN: 'ADMIN',
  OFFICER: 'OFFICER',
  LEGAL: 'LEGAL',
  PM: 'PM',
  DIRECTOR: 'DIRECTOR',
};

export const roleLabels = {
  ADMIN: 'Administrator',
  OFFICER: 'Land Acquisition Officer',
  LEGAL: 'Legal Team',
  PM: 'Project Manager',
  DIRECTOR: 'Director / Management',
};

export const routePermissions = {
  '/dashboard': [ROLES.ADMIN, ROLES.OFFICER, ROLES.LEGAL, ROLES.PM, ROLES.DIRECTOR],
  '/entry': [ROLES.ADMIN, ROLES.OFFICER],
  '/records': [ROLES.ADMIN, ROLES.OFFICER, ROLES.LEGAL],
  '/workflow': [ROLES.ADMIN, ROLES.OFFICER, ROLES.LEGAL, ROLES.PM],
  '/reports': [ROLES.ADMIN, ROLES.PM, ROLES.DIRECTOR],
  '/settings': [ROLES.ADMIN],
  '/users': [ROLES.ADMIN],
  '/activity': [ROLES.ADMIN],
};

export const fieldPermissions = {
  land: [ROLES.ADMIN, ROLES.OFFICER],
  owner: [ROLES.ADMIN, ROLES.OFFICER],
  legal: [ROLES.ADMIN, ROLES.LEGAL],
  deleteRecord: [ROLES.ADMIN],
  saveRecord: [ROLES.ADMIN, ROLES.OFFICER, ROLES.LEGAL],
};

export function canAccess(user, path) {
  const normalizedRole = (user?.role || '').toUpperCase();

  if (path.startsWith('/entry/') && [ROLES.ADMIN, ROLES.OFFICER, ROLES.LEGAL].includes(normalizedRole)) {
    return true;
  }
  const basePath = Object.keys(routePermissions)
    .sort((a, b) => b.length - a.length)
    .find((route) => path.startsWith(route));
  if (!basePath) return true;
  return routePermissions[basePath].includes(normalizedRole);
}

export function canEditSection(user, section) {
  const normalizedRole = (user?.role || '').toUpperCase();
  return fieldPermissions[section]?.includes(normalizedRole) ?? false;
}

export function isReadOnlyRole(role) {
  return [ROLES.PM, ROLES.DIRECTOR].includes((role || '').toUpperCase());
}

export function passwordMeetsPolicy(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}
