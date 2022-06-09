import React from 'react';

import { Typography } from '@mui/material';

import kingDiscSrc from '../../assets/img/king_disc.png';

export const TheKingDIsc = () => (
  <>
    <img src={kingDiscSrc} alt="King Disc" style={{ width: 80, height: 80 }} />

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
