import { History } from '@mui/icons-material';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { activityService } from '../services/activityService.js';
 

function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    activityService.getAll().then((data) => {
      setActivities(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Loading activity log..." />;

  return (
    <Box>
      <SectionHeader title="Activity Log" subtitle="Audit timeline for parcel, legal, user, and security actions." />
      <Card>
        <CardContent>
          {activities.length === 0 && <EmptyState title="No activity yet" message="Actions will appear here as users work in the tracker." />}
          <Stack spacing={0}>
            {activities.map((activity, index) => (
              <Box key={activity.id || activity._id} sx={{ display: 'flex', gap: 2, pb: 2.5, position: 'relative' }}>
                <Box sx={{ display: 'grid', justifyItems: 'center' }}>
                  <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main', display: 'grid', placeItems: 'center' }}>
                    <History fontSize="small" />
                  </Box>
                  {index < activities.length - 1 && <Box sx={{ width: 2, flex: 1, bgcolor: '#d8e2ee', minHeight: 42 }} />}
                </Box>
                <Box sx={{ flex: 1, pt: 0.5 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
                    <Typography fontWeight={700}>{activity.action}</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date(activity.timestamp).toLocaleString()}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {activity.userName || activity.employeeId || activity.role}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <StatusBadge label={activity.role} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ActivityLog;
