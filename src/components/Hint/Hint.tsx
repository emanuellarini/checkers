import React, { memo } from 'react';

import { Typography } from '@mui/material';

export const Hint = memo(() => (
  <Typography
    variant="overline"
    component="p"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      mt: 1.5,
      mb: 1,
      mx: 'none',
      flexWrap: 'wrap'
    }}
  >
    HINT: YOU CAN PASS THE TURN BY
    <Typography
      variant="overline"
      component="span"
      sx={{ fontWeight: 'bold', fontSize: 'inherit', mx: 0.5 }}
    >
      PRESSING ENTER
    </Typography>
    AFTER YOUR MOVE
  </Typography>
));
