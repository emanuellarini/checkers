import React from 'react';

import { Container, ThemeProvider, CssBaseline } from '@mui/material';

import { Header } from './components';
import { theme } from './lib/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container></Container>
    </ThemeProvider>
  );
}

export default App;
