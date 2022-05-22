import React, { memo } from 'react';

import { Typography } from '@mui/material';

export const Hint = memo(() => (
  <Typography
    variant="overline"
    component="p"
    sx={{ display: 'flex', justifyContent: 'center', m: 'none' }}
  >
    HINT: YOU CAN PASS THE TURN BY
    <Typography
      variant="overline"
      component="span"
      sx={{ fontWeight: 'bold', fontSize: 'inherit', mx: 0.5 }}
    >
      PRESSING SPACEBAR
    </Typography>
    AFTER YOUR MOVE
  </Typography>
));
