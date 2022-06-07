import React, { memo } from 'react';

import { Disc as DiscType } from '@checkers/game-interfaces';

import { Zoom, Paper } from '@mui/material';

import { KingDiscIcon } from './KingDiscIcon';

export type DiscProps = Omit<DiscType, 'id' | 'position'> & {
  isDragging?: boolean;
  isDraggableByCurrentPlayer?: boolean;
};

export const Disc: React.FC<DiscProps> = memo(
  ({ isKing, isDragging, player, isDraggableByCurrentPlayer }) => (
    <Zoom in appear={!isDraggableByCurrentPlayer}>
      <Paper
        aria-label={isKing ? 'King' : undefined}
        elevation={isDragging ? 24 : 6}
        component="div"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: player === 0 ? 'primary.main' : 'secondary.main',
          pb: '90%',
          width: '90%',
          m: '5%',
          border: 1,
          borderRadius: '50%',
          borderColor: 'common.white',
          borderStyle: 'double',
          // anti aliasing effect
          boxShadow: '0 0 1px 0px white inset, 0 0 1px 0px white'
        }}
      >
        {isKing ? <KingDiscIcon /> : null}
      </Paper>
    </Zoom>
  )
);
