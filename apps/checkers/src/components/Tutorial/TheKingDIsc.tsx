import React from 'react';

import { Typography } from '@mui/material';

export const TheKingDIsc = () => (
  <>
    <img
      src="https://ik.imagekit.io/a26m6rvtk/img/king_disc_W4hYnv_ma.png/tr:h-120"
      alt="King Disc"
      height={120}
    />

    <Typography component="p" sx={{ mt: 1, mb: 1 }}>
      The King Disc is a special type of Disc.
    </Typography>
    <Typography component="p" sx={{ mb: 1 }}>
      You can King one when your Discs reach the end of your opponent's side.
    </Typography>
    <Typography component="p" sx={{ mb: 1 }}>
      Since it is special, it can do everything a regular Disc does and also
      move backwards your opponent’s Discs!
    </Typography>
  </>
);
