import { Box, Card, CardContent, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { canAccess } from '../utils/rbac.js';

function RoleProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!canAccess(user, location.pathname)) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
        <Card sx={{ maxWidth: 560 }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="error" sx={{ mb: 1 }}>
              Access Denied
            </Typography>
            <Typography color="text.secondary">
              You do not have permission to access this page.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return <Outlet />;
}

export default RoleProtectedRoute;
