import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { RoomProvider } from './context';
import { theme } from './lib/theme';
import { NotFound, Play, Home } from './routes';

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:gameId" element={<Play />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </ThemeProvider>
);
