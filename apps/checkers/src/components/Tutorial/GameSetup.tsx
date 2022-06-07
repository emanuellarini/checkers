import React from 'react';

import { Typography } from '@mui/material';

export const GameSetup = () => (
  <>
    <Typography component="p" sx={{ mb: 1 }}>
      Before we start the mechanics and stuff let's speak about turns.
    </Typography>
    <Typography component="p" sx={{ mb: 1 }}>
      The player who created the game will start first and for the next, starts
      who lost in the last one.
    </Typography>
    <Typography component="p">
      A player can pass his turn after making a movement and press <b>Enter</b>{' '}
      or click on a button that appears in the down right corner of the page
    </Typography>
  </>
);
