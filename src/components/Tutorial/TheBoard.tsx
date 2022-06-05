import React from 'react';

import { Typography } from '@mui/material';
import Image from 'next/image';

import boardPic from '../../../public/img/board.png';

export const TheBoard = () => (
  <>
    <Typography component="p" sx={{ mb: 1 }}>
      This is how it looks once the game starts:
    </Typography>
    <Image src={boardPic} alt="Picture of the board" />
    <Typography component="p" sx={{ mb: 1, mt: 1 }}>
      Consists of 64 (8x8) squares: <b>32 Dark and 32 Light</b>.
    </Typography>
    <Typography component="p" sx={{ mb: 1 }}>
      It is positioned so that each player has a Light square on the right side
      corner closest to him or her.
    </Typography>
    <Typography component="p" sx={{ mb: 1 }}>
      <b>Each player stats with 12 Discs</b> and they are placed only in Dark
      squares at the first 3 closest rows of the player and can only be dropped
      in them.
    </Typography>
    <Typography component="p">
      First player has the <b>Black</b> discs while the second has <b>Red</b>{' '}
      ones.
    </Typography>
  </>
);
