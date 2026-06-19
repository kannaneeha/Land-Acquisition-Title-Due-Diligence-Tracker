import { Add, AssignmentLate, CheckCircle, Gavel, Groups, Map, Search, Security, TrendingUp, Warning } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BarChart, ChartCard, PieChart } from '../components/Charts.jsx';
import KpiCard from '../components/KpiCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { getActivityLog } from '../utils/activity.js';
import { recentActivities } from '../utils/mockData.js';
import { ROLES } from '../utils/rbac.js';
import { getStoredLandRecords } from '../utils/storage.js';
import { getStoredUsers } from '../utils/users.js';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const records = getStoredLandRecords();
  const users = getStoredUsers();
  const activities = getActivityLog();
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
  const roleCards = {
    [ROLES.ADMIN]: [
      { title: 'User Statistics', value: users.length, helper: 'Configured system users', icon: <Groups /> },
      { title: 'Active Users', value: users.filter((item) => item.status === 'ACTIVE').length, helper: 'Can access the platform', icon: <Security />, color: 'success.main' },
      { title: 'System Health', value: '99.9%', helper: 'Mock API availability', icon: <TrendingUp /> },
      { title: 'Audit Activity', value: activities.length, helper: 'Tracked security and data events', icon: <AssignmentLate />, color: 'warning.main' },
    ],
    [ROLES.OFFICER]: [
      { title: 'My Assigned Parcels', value: total, helper: 'Acquisition cases in scope', icon: <Map /> },
      { title: 'Pending Acquisition Activities', value: records.filter((record) => record.workflowStage < 3).length, helper: 'Require field follow-up', icon: <AssignmentLate />, color: 'warning.main' },
      { title: 'Recently Added Parcels', value: records.filter((record) => record.createdAt?.startsWith('2026-05')).length, helper: 'Added this period', icon: <Add />, color: 'success.main' },
    ],
    [ROLES.LEGAL]: [
      { title: 'Pending Title Verifications', value: pendingTitle, helper: 'Awaiting legal review', icon: <AssignmentLate />, color: 'warning.main' },
      { title: 'Encumbrance Issues', value: encumbranceIssues, helper: 'Need legal resolution', icon: <Gavel />, color: 'error.main' },
      { title: 'Blocked Cases', value: records.filter((record) => record.legalClearanceStatus === 'Blocked').length, helper: 'Escalation required', icon: <Warning />, color: 'error.main' },
      { title: 'Legal Review Queue', value: records.filter((record) => record.legalClearanceStatus === 'In Review').length, helper: 'Currently under review', icon: <CheckCircle /> },
    ],
    [ROLES.PM]: [
      { title: 'Overall Progress', value: `${completion}%`, helper: 'Portfolio clearance rate', icon: <TrendingUp /> },
      { title: 'Delayed Parcels', value: records.filter((record) => record.workflowStage <= 2).length, helper: 'Below expected stage', icon: <Warning />, color: 'warning.main' },
      { title: 'Team Performance', value: '87%', helper: 'Operational SLA score', icon: <Groups />, color: 'success.main' },
      { title: 'Acquisition Status', value: `${records.filter((record) => record.workflowStage === 6).length}/${total}`, helper: 'Completed parcels', icon: <Map /> },
    ],
    [ROLES.DIRECTOR]: [
      { title: 'Executive KPIs', value: `${completion}%`, helper: 'Completion across portfolio', icon: <TrendingUp /> },
      { title: 'Total Land Acquired', value: `${records.reduce((sum, record) => sum + Number(record.area), 0).toFixed(1)}`, helper: 'Acres under diligence', icon: <Map /> },
      { title: 'Critical Risks', value: encumbranceIssues, helper: 'Encumbrance exposure', icon: <Warning />, color: 'error.main' },
      { title: 'Portfolio Summary', value: total, helper: 'Total active parcels', icon: <CheckCircle />, color: 'success.main' },
    ],
  };

  return (
    <Box>
      <SectionHeader
        title="Operations Dashboard"
        subtitle="Portfolio health across acquisition, title, encumbrance, and legal workflows."
        action={(
          <Stack direction="row" spacing={1}>
            {[ROLES.ADMIN, ROLES.OFFICER].includes(user?.role) && <Button startIcon={<Add />} variant="contained" onClick={() => navigate('/entry')}>New Parcel</Button>}
            <Button startIcon={<Search />} variant="outlined" onClick={() => navigate('/records')}>Search Records</Button>
          </Stack>
        )}
      />
      <Grid container spacing={2.5}>
        {(roleCards[user?.role] || []).map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <KpiCard {...card} progress={card.title.includes('Progress') || card.title.includes('KPI') ? completion : undefined} />
          </Grid>
        ))}
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
