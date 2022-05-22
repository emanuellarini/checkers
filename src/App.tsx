import React from 'react';

import { Paper, Container, ThemeProvider, CssBaseline } from '@mui/material';

import { Header, Board, Turn, Hint, Win } from './components';
import { GameProvider } from './context';
import { theme } from './lib/theme';

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GameProvider>
      <Header />
      <Container sx={{ mt: 1, mb: 4, maxWidth: '80%' }}>
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
  </ThemeProvider>
);
