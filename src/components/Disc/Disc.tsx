import React from 'react';

import { Paper } from '@mui/material';

import { KingDiscIcon } from './KingDiscIcon';

export type DiscProps = {
  player: 1 | 2;
  isKing?: boolean;
};

export const Disc: React.FC<DiscProps> = ({ player = 1, isKing = false }) => (
  <Paper
    elevation={4}
    component="div"
    aria-label="Disc"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `player${player}.main`,
      m: '15%',
      width: '70%',
      height: '70%',
      border: 1,
      borderRadius: '50%',
      borderColor: 'common.white',
      borderStyle: 'double'
    }}
  >
    {isKing && <KingDiscIcon />}
  </Paper>
);
