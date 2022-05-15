import React from 'react';

import { Paper, ThemeProvider, CssBaseline } from '@mui/material';

import { Header, Board } from './components';
import { theme } from './lib/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Paper
        elevation={4}
        sx={{
          mt: 4,
          mb: 4,
          ml: 'auto',
          mr: 'auto',
          maxWidth: '50vh',
          maxHeight: '50vh',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridAutoRows: 'calc(100% / 8)',
          gridAutoColumns: 'calc(100% / 8)',
          justifyContent: 'center',
          border: '1.25em ridge #492510'
        }}
      >
        <Board />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
