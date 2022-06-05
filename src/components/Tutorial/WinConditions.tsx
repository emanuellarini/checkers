import React from 'react';

import { Typography } from '@mui/material';

export const WinConditions = () => (
  <>
    <Typography component="p" sx={{ mb: 1 }}>
      Wins the game who first:
    </Typography>
    <Typography component="p" sx={{ mb: 1, ml: 1 }}>
      <b>1. </b>Capture all opponent's Discs.
    </Typography>
    <Typography component="p" sx={{ mb: 1, ml: 1 }}>
      <b>2. </b>Ends a turn with a King Disc versus a regular Disc.
    </Typography>
  </>
);
