import React, { memo } from 'react';

import { Toolbar, Typography } from '@mui/material';

export const HeaderToolbar = memo(() => (
  <Toolbar>
    <Typography variant="h6" component="div">
      Checkers Game
    </Typography>
  </Toolbar>
));
