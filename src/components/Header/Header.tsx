import React, { memo } from 'react';

import { AppBar, Typography, Toolbar } from '@mui/material';

import { useGame } from '../../hooks';

const Title: React.FC<{ turn: number }> = memo(({ turn }) => (
  <Typography variant="h6" component="div">
    Checkers Game - Player {turn} Turn
  </Typography>
));

export const Header = () => {
  const { turn } = useGame();

  return (
    <AppBar position="static">
      <Toolbar>
        <Title turn={turn} />
      </Toolbar>
    </AppBar>
  );
};
