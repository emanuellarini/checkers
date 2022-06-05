import React from 'react';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import move1 from '../../../public/img/move_1.png';
import move2 from '../../../public/img/move_2.png';

export const RegularMovements = () => (
  <>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <Image
        src={move1}
        alt="Picture of the Red Disc Movement"
        width={200}
        height={200}
        layout="fixed"
      />
      <Image
        src={move2}
        alt="Picture of the Black Disc Movement"
        width={200}
        height={200}
        layout="fixed"
      />
    </Box>
    <Typography component="p" sx={{ mb: 1, mt: 1 }}>
      A player turn consists in making movement(s). These are the rules for a
      regular movement:
    </Typography>
    <Typography component="p" sx={{ mb: 1, ml: 2 }}>
      <b>1. </b>You can only move in Dark squares.
    </Typography>
    <Typography component="p" sx={{ mb: 1, ml: 2 }}>
      <b>2. </b>You can only move one Disc in one square diagonal space toward
      your opponent’s Discs.
    </Typography>
    <Typography component="p" sx={{ mb: 1, ml: 2 }}>
      <b>3. </b>You can't move in a square that already contains a Disc.
    </Typography>
    <Typography component="p" sx={{ mb: 1, ml: 2 }}>
      <b>4. </b>You make a Jump movement if there is an opponent's Disc in the
      next diagonal square and there is an empty space after it.
    </Typography>
    <Typography component="p" sx={{ mb: 1, ml: 2 }}>
      <b>5. </b>Once you move a Disc you can not go back in that action.
    </Typography>

    <Typography component="p">
      Every time a Jump happens it means it is also a Capture movement. In that
      case we should remove the opponent's Disc from the game.
    </Typography>
  </>
);
