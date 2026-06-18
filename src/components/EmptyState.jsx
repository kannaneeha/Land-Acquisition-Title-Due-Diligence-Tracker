import { Box, Typography } from '@mui/material';

function EmptyState({ title = 'No records found', message = 'Try adjusting search or filter settings.' }) {
  return (
    <Box sx={{ py: 7, px: 2, textAlign: 'center' }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>{message}</Typography>
    </Box>
  );
}

export default EmptyState;
