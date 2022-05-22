import React, { memo } from 'react';

import { Avatar, Box, Typography, Slide } from '@mui/material';

import { Stats } from './Stats';
import { flexColumnStyle } from './styles';

type PlayerProps = Player & {
  turn: Turn;
  avatarUrl?: string;
};

export const Player: React.FC<PlayerProps> = memo(
  ({ name, gameStats, turn, avatarUrl }) => (
    <Slide
      direction={turn === 1 ? 'right' : 'left'}
      in
      mountOnEnter
      unmountOnExit
      key={'player-' + turn + '-slide-header'}
      timeout={{ enter: 450 }}
    >
      <Box
        sx={{
          ...flexColumnStyle,
          pb: 1
        }}
      >
        <Box sx={flexColumnStyle}>
          <Avatar
            alt={name}
            src={avatarUrl}
            sx={{ width: '3.25em', height: '3.25em', mb: 1 }}
          />
          <Typography variant="overline">Player {turn} Turn</Typography>
          <Typography variant="h5">{name}</Typography>
          <Stats gameStats={gameStats} />
        </Box>
      </Box>
    </Slide>
  )
);