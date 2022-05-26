import React, { memo } from 'react';

import { Paper } from '@mui/material';

import { KingDiscIcon } from './KingDiscIcon';

type DiscProps = Omit<Disc, 'id' | 'position'> & { isDragging?: boolean };

export const Disc: React.FC<DiscProps> = memo(
  ({ isKing, isDragging, player }) => (
    <Paper
      aria-label={isKing ? 'King' : undefined}
      elevation={isDragging ? 24 : 6}
      component="div"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `player${player}.main`,
        pb: '90%',
        width: '90%',
        m: '5%',
        border: 1,
        borderRadius: '50%',
        borderColor: 'common.white',
        borderStyle: 'double'
      }}
    >
      {isKing ? <KingDiscIcon /> : null}
    </Paper>
  )
);
