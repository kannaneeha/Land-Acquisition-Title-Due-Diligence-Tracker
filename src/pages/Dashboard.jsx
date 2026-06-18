import { Add, AssignmentLate, CheckCircle, Gavel, Map, Search } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BarChart, ChartCard, PieChart } from '../components/Charts.jsx';
import KpiCard from '../components/KpiCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { recentActivities } from '../utils/mockData.js';
import { getStoredLandRecords } from '../utils/storage.js';

function Dashboard() {
  const navigate = useNavigate();
  const records = getStoredLandRecords();
  const total = records.length;
  const pendingTitle = records.filter((record) => record.titleStatus === 'Pending').length;
  const completedLegal = records.filter((record) => record.legalClearanceStatus === 'Cleared').length;
  const encumbranceIssues = records.filter((record) => record.encumbranceStatus === 'Issue Found').length;
  const completion = Math.round((completedLegal / Math.max(total, 1)) * 100);

  const titleData = ['Pending', 'Verified', 'Rejected'].map((label) => ({
    label,
    value: records.filter((record) => record.titleStatus === label).length,
  }));
  const areaData = records.map((record) => ({ label: record.village, value: Number(record.area) }));

  return (
    <Box>
      <SectionHeader
        title="Operations Dashboard"
        subtitle="Portfolio health across acquisition, title, encumbrance, and legal workflows."
        action={(
          <Stack direction="row" spacing={1}>
            <Button startIcon={<Add />} variant="contained" onClick={() => navigate('/entry')}>New Parcel</Button>
            <Button startIcon={<Search />} variant="outlined" onClick={() => navigate('/records')}>Search Records</Button>
          </Stack>
        )}
      />
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Total Land Parcels" value={total} helper="Active acquisition records" icon={<Map />} progress={100} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Pending Title Verifications" value={pendingTitle} helper="Requires document review" icon={<AssignmentLate />} color="warning.main" progress={(pendingTitle / Math.max(total, 1)) * 100} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Completed Legal Clearances" value={completedLegal} helper={`${completion}% portfolio cleared`} icon={<CheckCircle />} color="success.main" progress={completion} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Encumbrance Issues" value={encumbranceIssues} helper="Escalated due diligence cases" icon={<Gavel />} color="error.main" progress={(encumbranceIssues / Math.max(total, 1)) * 100} />
        </Grid>

        <Grid item xs={12} lg={5}>
          <ChartCard title="Land Status Distribution">
            <PieChart data={titleData} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={7}>
          <ChartCard title="Parcel Area by Village">
            <BarChart data={areaData} />
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Activities</Typography>
              <List disablePadding>
                {recentActivities.map((activity) => (
                  <ListItem key={activity} divider sx={{ px: 0 }}>
                    <ListItemText primary={activity} secondary="Updated by acquisition operations" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Priority Cases</Typography>
              <Stack spacing={1.5}>
                {records.filter((record) => record.encumbranceStatus === 'Issue Found' || record.legalClearanceStatus === 'Blocked').map((record) => (
                  <Box key={record.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, p: 1.5, bgcolor: '#f7faff', borderRadius: 2 }}>
                    <Box>
                      <Typography fontWeight={700}>{record.surveyNumber}</Typography>
                      <Typography variant="body2" color="text.secondary">{record.ownerName}</Typography>
                    </Box>
                    <StatusBadge label={record.legalClearanceStatus} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
