import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { theme } from './lib/theme';
import { Routes } from './pages/Routes';

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes />
  </ThemeProvider>
);
