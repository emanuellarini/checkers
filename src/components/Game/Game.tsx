import React from 'react';

import { Paper, useMediaQuery, useTheme } from '@mui/material';

import { Board, Win, Hint, Turn } from '../';

export const Game = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxWidth = matches ? '100%' : '80%';

  return (
    <>
      <Hint />
      <Win />
      <Paper
        elevation={4}
        sx={{
          maxWidth,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          justifyContent: 'center',
          border: '1.25em ridge #492510',
          m: '0 auto'
        }}
      >
        <Board />
        <Turn />
      </Paper>
    </>
  );
};
