import React from 'react';

import { Typography } from '@mui/material';
import Image from 'next/image';

import kingDiscSrc from '../../../public/img/king_disc.png';

export const TheKingDIsc = () => (
  <>
    <Image
      src={kingDiscSrc}
      alt="Picture of King Disc"
      layout="fixed"
      width={120}
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
