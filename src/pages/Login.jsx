import { LockOutlined } from '@mui/icons-material';
import { Alert, Avatar, Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: 'background.default', p: 2 }}>
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 54, height: 54 }}>
                <LockOutlined />
              </Avatar>
              <Typography variant="h5" textAlign="center">Land Acquisition & Title Due Diligence Tracker</Typography>
              <Typography color="text.secondary" textAlign="center">Secure access for Crownridge LLP acquisition teams</Typography>
            </Stack>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} fullWidth required autoFocus />
                <TextField label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} fullWidth required />
                <Button type="submit" size="large" variant="contained" disabled={loading}>
                  {loading ? 'Signing in...' : 'Login'}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
