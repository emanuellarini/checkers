import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { Game } from './components';
import { theme } from './lib/theme';

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Game />
  </ThemeProvider>
);
