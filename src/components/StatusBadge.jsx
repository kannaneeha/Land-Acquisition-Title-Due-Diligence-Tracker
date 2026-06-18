import { Chip } from '@mui/material';

const colorMap = {
  Verified: 'success',
  Cleared: 'success',
  Clear: 'success',
  Completed: 'success',
  Pending: 'warning',
  'In Review': 'info',
  'Issue Found': 'error',
  Rejected: 'error',
  Blocked: 'error',
};

function StatusBadge({ label }) {
  return (
    <Chip
      size="small"
      label={label}
      color={colorMap[label] || 'default'}
      variant={colorMap[label] ? 'filled' : 'outlined'}
      sx={{ fontWeight: 700, minWidth: 88 }}
    />
  );
}

export default StatusBadge;
