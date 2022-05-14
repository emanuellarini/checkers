import React from 'react';

import { AppBar, Typography, Toolbar } from '@mui/material';

export const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div">
        Checkers Game
      </Typography>
    </Toolbar>
  </AppBar>
);
