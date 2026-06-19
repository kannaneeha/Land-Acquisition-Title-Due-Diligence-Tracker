const ACTIVITY_KEY = 'crownridge_activity_log';

export function getActivityLog() {
  const stored = localStorage.getItem(ACTIVITY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addActivityLog(user, action) {
  const entry = {
    id: `ACT-${Date.now()}`,
    userName: user?.username || user?.name || 'System',
    employeeId: user?.employeeId || 'SYSTEM',
    role: user?.role || 'SYSTEM',
    action,
    timestamp: new Date().toISOString(),
  };
  const nextLog = [entry, ...getActivityLog()].slice(0, 150);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(nextLog));
  return entry;
}

export function seedActivityLog(user) {
  if (getActivityLog().length) return;
  [
    'Parcel Added',
    'Title Verified',
    'Legal Clearance Approved',
    'Encumbrance Issue Escalated',
  ].forEach((action) => addActivityLog(user, action));
}
