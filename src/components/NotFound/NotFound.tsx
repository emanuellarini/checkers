import React from 'react';

import { Box, Typography } from '@mui/material';

export const NotFound = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}
  >
    <Typography
      variant="h1"
      color="inherit"
      sx={{ textAlign: 'center', mt: 2, textTransform: 'uppercase' }}
    >
      404 -Game Not Found!
    </Typography>
  </Box>
);
