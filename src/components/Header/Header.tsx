import React, { memo } from 'react';

import { AppBar, Collapse } from '@mui/material';

import { useGame } from '../../hooks';
import { HeaderToolbar } from './HeaderToolbar';
import { Player } from './Player';

export const Header = memo(() => {
  const { turn, players } = useGame();

  return (
    <AppBar position="static">
      <HeaderToolbar />
      <Collapse in timeout={{ enter: 350 }} appear>
        <Player {...players[turn]} turn={turn} />
      </Collapse>
    </AppBar>
  );
});
