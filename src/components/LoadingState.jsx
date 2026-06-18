import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingState({ label = 'Loading records...' }) {
  return (
    <Box sx={{ py: 6, display: 'grid', placeItems: 'center', gap: 2 }}>
      <CircularProgress />
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  );
}

export default LoadingState;
