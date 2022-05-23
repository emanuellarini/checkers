import React from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

export const Loading = ({ message = 'Loading the Game...' }) => (
  <Box
    sx={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}
  >
    <CircularProgress color="inherit" />
    <Typography
      variant="h6"
      color="inherit"
      sx={{ textAlign: 'center', mt: 2, textTransform: 'uppercase' }}
    >
      {message}
    </Typography>
  </Box>
);
