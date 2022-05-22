import React from 'react';

import { Container, Paper, useMediaQuery, useTheme } from '@mui/material';

import { Board, Header, Hint, Turn, Win } from '../';
import { GameProvider } from '../../context';

export const Game = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxWidth = matches ? '100%' : '80%';

  return (
    <GameProvider>
      <Header />
      <Container sx={{ mt: 1, mb: 4, maxWidth }}>
        <Hint />
        <Paper
          elevation={4}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            justifyContent: 'center',
            border: '1.25em ridge #492510'
          }}
        >
          <Board />
          <Turn />
        </Paper>
      </Container>
      <Win />
    </GameProvider>
  );
};
