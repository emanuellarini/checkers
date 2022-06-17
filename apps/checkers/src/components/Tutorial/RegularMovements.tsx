import React from 'react';

import { Box, Typography } from '@mui/material';

export const RegularMovements = () => (
  <>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <img
        src="https://ik.imagekit.io/a26m6rvtk/img/move_1_EXLQK4E8RY.png/tr:h-250"
        alt="Black Disc Movement"
        height={250}
      />
      <img
        src="https://ik.imagekit.io/a26m6rvtk/img/move_2_6mRLTIMXI.png/tr:h-250"
        alt="Red Disc Movement"
        height={250}
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

    <Typography component="p" sx={{ mb: 1 }}>
      Every time a Jump happens it means it is also a Capture movement. In that
      case we should remove the opponent's Disc from the game.
    </Typography>

    <Typography component="p">
      Capturing is totally optional. It's up to you to decide if you want or not
      to capture an enemy disc in your turn.
    </Typography>
  </>
);
