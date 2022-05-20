import React from 'react';

import { AppBar, Typography, Toolbar } from '@mui/material';

import { useGame } from '../../hooks';

export const Header = () => {
  const { turn } = useGame();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Checkers Game - Player {turn} Turn
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
