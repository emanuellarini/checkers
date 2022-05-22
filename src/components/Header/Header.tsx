import React, { useMemo, memo } from 'react';

import { AppBar, Collapse, Typography, Toolbar } from '@mui/material';
import gravatar from 'gravatar';

import { useGame } from '../../hooks';
import { Player } from './Player';

export const Header = memo(() => {
  const { turn, players } = useGame();
  const { email } = players[turn];

  const avatarUrl = useMemo(() => {
    return gravatar.url(email, {
      protocol: 'https',
      size: '100px',
      d: '404'
    });
  }, [email]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Checkers Game
        </Typography>
      </Toolbar>
      <Collapse in timeout={{ enter: 350 }} appear>
        <Player avatarUrl={avatarUrl} {...players[turn]} turn={turn} />
      </Collapse>
    </AppBar>
  );
});
