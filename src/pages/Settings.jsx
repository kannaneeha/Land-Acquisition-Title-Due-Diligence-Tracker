import { Business, Notifications, Route, Security, Storage, Tune } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader.jsx';

function Settings() {
  return (
    <Box>
      <SectionHeader
        title="Settings"
        subtitle="Configure organization profile, security controls, workflow policies, and operational preferences."
      />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Business color="primary" />
                <Typography variant="h6">Organization Settings</Typography>
              </Stack>
              <Stack spacing={2}>
                <TextField label="Organization Name" defaultValue="Crownridge LLP" fullWidth />
                <TextField label="Default State" defaultValue="Tamil Nadu" fullWidth />
                <TextField label="Records Retention Policy" defaultValue="Permanent legal archive" fullWidth />
                <TextField label="Registered Office" defaultValue="Crownridge LLP Corporate Office" fullWidth />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Security color="primary" />
                <Typography variant="h6">Security Settings</Typography>
              </Stack>
              {['Two-factor authentication', 'Account lockout after 5 failures', 'Strong password policy', 'Session audit logging'].map((label) => (
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
                <Typography variant="h6">Integration & Connectivity</Typography>
              </Stack>
              <TextField label="Backend Base URL" defaultValue="http://localhost:5000/api" fullWidth />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Route color="primary" />
                <Typography variant="h6">Workflow Configuration</Typography>
              </Stack>
              <Stack spacing={2}>
                <TextField label="Approval SLA" defaultValue="7 business days" fullWidth />
                <TextField label="Escalation Threshold" defaultValue="15 days pending" fullWidth />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Tune color="primary" />
                <Typography variant="h6">User Preferences</Typography>
              </Stack>
              {['Compact tables', 'Show executive widgets', 'Auto-refresh dashboard'].map((label) => (
                <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                  <Typography>{label}</Typography>
                  <Switch defaultChecked />
                </Stack>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Notifications color="primary" />
                <Typography variant="h6">Notification Preferences</Typography>
              </Stack>
              {['Legal review required', 'Blocked case escalation', 'New parcel created'].map((label) => (
                <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                  <Typography>{label}</Typography>
                  <Switch defaultChecked />
                </Stack>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
