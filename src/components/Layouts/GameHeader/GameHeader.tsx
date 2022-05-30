import React, { memo } from 'react';

import { AppBar, Collapse } from '@mui/material';

import { HeaderToolbar } from '../HeaderToolbar';
import { Player } from './Player';

export const GameHeader = memo(() => (
  <AppBar position="static">
    <HeaderToolbar />
    <Collapse in timeout={{ enter: 350 }} appear>
      <Player />
    </Collapse>
  </AppBar>
));
