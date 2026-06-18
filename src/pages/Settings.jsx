import { Business, Security, Storage } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader.jsx';

function Settings() {
  return (
    <Box>
      <SectionHeader title="Settings" subtitle="Configure organization profile, security controls, and integration defaults." />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Business color="primary" />
                <Typography variant="h6">Organization</Typography>
              </Stack>
              <Stack spacing={2}>
                <TextField label="Organization Name" defaultValue="Crownridge LLP" fullWidth />
                <TextField label="Default State" defaultValue="Tamil Nadu" fullWidth />
                <TextField label="Records Retention Policy" defaultValue="Permanent legal archive" fullWidth />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Security color="primary" />
                <Typography variant="h6">Security</Typography>
              </Stack>
              {['Two-factor authentication', 'Approval alerts', 'Legal review reminders'].map((label) => (
                <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                  <Typography>{label}</Typography>
                  <Switch defaultChecked />
                </Stack>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Storage color="primary" />
                <Typography variant="h6">API Integration</Typography>
              </Stack>
              <TextField label="Backend Base URL" defaultValue="http://localhost:5000/api" fullWidth />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
