import { Download, PictureAsPdf, TableChart } from '@mui/icons-material';
import { Box, Button, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { BarChart, ChartCard, LineChart, PieChart } from '../components/Charts.jsx';
import LoadingState from '../components/LoadingState.jsx';
import KpiCard from '../components/KpiCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { activityService } from '../services/activityService.js';
import { landService } from '../services/landService.js';
import { reportService } from '../services/reportService.js';
import { exportRecordsToExcel, exportReportToPdf } from '../utils/exportUtils.js';

function groupCount(records, key) {
  return records.reduce((acc, record) => {
    acc[record[key]] = (acc[record[key]] || 0) + 1;
    return acc;
  }, {});
}

function Reports() {
  const [records, setRecords] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      landService.getAll(),
      activityService.getAll(),
    ]).then(([r, a]) => {
      setRecords(r || []);
      setActivities(a || []);
      setLoading(false);
    });
  }, []);

  const pendingCases = records.filter((record) => ['Pending', 'In Review', 'Blocked'].includes(record.legalClearanceStatus)).length;
  const acquired = records.filter((record) => record.workflowStage === 6).length;
  const totalArea = records.reduce((sum, record) => sum + Number(record.area), 0).toFixed(1);
  const pendingVerification = records.filter((record) => record.titleStatus === 'Pending').length;
  const encumbranceIssues = records.filter((record) => record.encumbranceStatus === 'Issue Found').length;

  const legalData = Object.entries(groupCount(records, 'legalClearanceStatus')).map(([label, value]) => ({ label, value }));
  const titleData = Object.entries(groupCount(records, 'titleStatus')).map(([label, value]) => ({ label, value }));
  const monthlyData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => ({
    label: month,
    value: records.filter((record) => new Date(record.createdAt).getMonth() === index).length,
  }));
  const progressData = records.map((record) => ({
    label: record.village || record.location,
    value: Math.round(((record.workflowStage || 1) / 6) * 100),
  }));

  const handleExportPdf = async () => {
    try {
      const blob = await reportService.exportPdf().then((r) => r.data);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } catch {
      const metrics = [
        { label: 'Total parcels', value: records.length },
        { label: 'Total area', value: `${totalArea} acres` },
        { label: 'Acquisition completed', value: acquired },
        { label: 'Pending cases', value: pendingCases },
      ];
      exportReportToPdf({ title: 'Crownridge LLP Due Diligence Report', metrics, records });
    }
  };

  const handleExportExcel = async () => {
    try {
      const blob = await reportService.exportExcel().then((r) => r.data);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'land-records.xls';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch {
      exportRecordsToExcel(records);
    }
  };

  const metrics = [
    { label: 'Total parcels', value: records.length },
    { label: 'Total area', value: `${totalArea} acres` },
    { label: 'Acquisition completed', value: acquired },
    { label: 'Pending cases', value: pendingCases },
  ];

  if (loading) return <LoadingState label="Loading reports..." />;

  return (
    <Box>
      <SectionHeader
        title="Reports & Analytics"
        subtitle="Executive analytics for acquisition progress, land status, legal clearance, and pending cases."
        action={(
          <Stack direction="row" spacing={1}>
            <Button startIcon={<PictureAsPdf />} variant="outlined" onClick={handleExportPdf}>Export PDF</Button>
            <Button startIcon={<TableChart />} variant="contained" onClick={handleExportExcel}>Export Excel</Button>
          </Stack>
        )}
      />
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Acquisition Progress" value={`${Math.round((acquired / Math.max(records.length, 1)) * 100)}%`} helper={`${acquired} completed parcels`} icon={<Download />} progress={(acquired / Math.max(records.length, 1)) * 100} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Total Area" value={totalArea} helper="Acres under diligence" icon={<TableChart />} progress={90} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Pending Cases" value={pendingCases} helper="Awaiting clearance or review" icon={<PictureAsPdf />} color="warning.main" progress={(pendingCases / Math.max(records.length, 1)) * 100} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Legal Clearances" value={legalData.find((item) => item.label === 'Cleared')?.value || 0} helper="Cleared for closure" icon={<TableChart />} color="success.main" progress={70} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Legal Clearance Summary" value={`${legalData.find((item) => item.label === 'Cleared')?.value || 0}/${records.length}`} helper="Audit-ready cleared cases" icon={<TableChart />} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Encumbrance Summary" value={encumbranceIssues} helper="Open encumbrance exposures" icon={<Download />} color="error.main" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="Pending Verification Summary" value={pendingVerification} helper="Title checks outstanding" icon={<PictureAsPdf />} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KpiCard title="User Activity Summary" value={activities.length} helper="Tracked audit events" icon={<TableChart />} />
        </Grid>

        <Grid item xs={12} lg={5}>
          <ChartCard title="Legal Clearance Statistics">
            <PieChart data={legalData} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={7}>
          <ChartCard title="Monthly Acquisitions">
            <LineChart data={monthlyData} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ChartCard title="Acquisition Progress by Village">
            <BarChart data={progressData} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ChartCard title="Land Status Distribution">
            <PieChart data={titleData} />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports;
