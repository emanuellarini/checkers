import React from 'react';

import { Paper, Container, ThemeProvider, CssBaseline } from '@mui/material';

import { Header, Board } from './components';
import { theme } from './lib/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <Container sx={{ mt: 4, mb: 4 }}>
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
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
