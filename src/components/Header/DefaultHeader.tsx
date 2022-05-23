import React from 'react';

import { AppBar } from '@mui/material';

import { HeaderToolbar } from './HeaderToolbar';

export const DefaultHeader = () => (
  <AppBar position="static">
    <HeaderToolbar />
  </AppBar>
);
