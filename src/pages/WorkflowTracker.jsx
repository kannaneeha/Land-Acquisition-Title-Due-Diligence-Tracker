import { Box, Card, CardContent, Grid, LinearProgress, Step, StepLabel, Stepper, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { workflowStages } from '../utils/mockData.js';
import { getStoredLandRecords } from '../utils/storage.js';

function WorkflowTracker() {
  const records = getStoredLandRecords();

  return (
    <Box>
      <SectionHeader title="Workflow Tracker" subtitle="Monitor every parcel from identification through acquisition completion." />
      <Grid container spacing={2.5}>
        {records.map((record) => {
          const activeStep = Math.max(record.workflowStage - 1, 0);
          const progress = Math.round((record.workflowStage / workflowStages.length) * 100);
          return (
            <Grid item xs={12} key={record.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">{record.surveyNumber} - {record.location}</Typography>
                      <Typography variant="body2" color="text.secondary">{record.ownerName} | {record.area} acres</Typography>
                    </Box>
                    <StatusBadge label={record.legalClearanceStatus} />
                  </Box>
                  <Stepper activeStep={activeStep} alternativeLabel sx={{ display: { xs: 'none', md: 'flex' }, mb: 3 }}>
                    {workflowStages.map((stage) => (
                      <Step key={stage}>
                        <StepLabel>{stage}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                    {workflowStages.map((stage, index) => (
                      <Box key={stage} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', pb: 1.5 }}>
                        <Box sx={{ display: 'grid', justifyItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: index <= activeStep ? 'primary.main' : '#c8d2de', mt: 0.25 }} />
                          {index < workflowStages.length - 1 && <Box sx={{ width: 2, height: 28, bgcolor: index < activeStep ? 'primary.main' : '#d8e2ee', mt: 0.5 }} />}
                        </Box>
                        <Typography fontWeight={index === activeStep ? 700 : 500}>{stage}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress variant="determinate" value={progress} sx={{ flex: 1, height: 9, borderRadius: 999 }} />
                    <Typography fontWeight={700}>{progress}%</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default WorkflowTracker;
