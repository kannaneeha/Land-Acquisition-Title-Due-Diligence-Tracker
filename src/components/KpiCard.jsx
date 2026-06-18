import { Box, Card, CardContent, LinearProgress, Typography } from '@mui/material';

function KpiCard({ title, value, helper, icon, color = 'primary.main', progress }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: `${color}18`,
              color,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h5" sx={{ mt: 0.5 }}>{value}</Typography>
            <Typography variant="caption" color="text.secondary">{helper}</Typography>
          </Box>
        </Box>
        {typeof progress === 'number' && (
          <LinearProgress variant="determinate" value={progress} sx={{ mt: 2, height: 7, borderRadius: 999 }} />
        )}
      </CardContent>
    </Card>
  );
}

export default KpiCard;
