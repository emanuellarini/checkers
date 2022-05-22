import React, { memo } from 'react';

import { Typography } from '@mui/material';

export const Debug = memo(({ position }: { position: Position }) => {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    // this will help you a lot :)
    <Typography variant="caption" sx={{ color: 'white', position: 'absolute' }}>
      {position}
    </Typography>
  );
});
