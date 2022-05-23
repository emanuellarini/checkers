import React, { useMemo, memo } from 'react';

import { AppBar, Collapse } from '@mui/material';
import gravatar from 'gravatar';

import { useGame } from '../../hooks';
import { HeaderToolbar } from './HeaderToolbar';
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
      <HeaderToolbar />
      <Collapse in timeout={{ enter: 350 }} appear>
        <Player avatarUrl={avatarUrl} {...players[turn]} turn={turn} />
      </Collapse>
    </AppBar>
  );
});
