import React from 'react';

import { Paper, useMediaQuery, useTheme } from '@mui/material';

import { Board, Win, Hint, Turn, Paused } from '../';

export const Game = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxWidth = matches ? '100%' : '80%';

  return (
    <>
      <Hint />
      <Win />
      <Paused />
      <Turn />
      <Paper
        elevation={4}
        sx={{
          maxWidth,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          justifyContent: 'center',
          border: '0.755em ridge #313131',
          m: '0 auto'
        }}
      >
        <Board />
      </Paper>
    </>
  );
};
