import React, { memo } from 'react';

import { AppBar } from '@mui/material';

import { HeaderToolbar } from '../HeaderToolbar';

export const DefaultHeader = memo(() => (
  <AppBar position="static">
    <HeaderToolbar />
  </AppBar>
));
