import React, { memo } from 'react';

import { Avatar, Box, Typography, Slide } from '@mui/material';
import gravatar from 'gravatar';

import { useRoom } from '../../../hooks';
import { Stats } from './Stats';
import { flexColumnStyle } from './styles';

export const Player = memo(() => {
  const { turn, players } = useRoom();

  const player = players.find(p => p.id === turn);

  if (!player) return null;

  return (
    <Slide
      direction={turn === 0 ? 'right' : 'left'}
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
            alt={player.name}
            src={gravatar.url(player.email, {
              protocol: 'https',
              size: '100px',
              d: '404'
            })}
            sx={{ width: '3.25em', height: '3.25em', mb: 1 }}
          />
          <Typography variant="overline" component="h2">{`Player ${
            turn + 1
          } Turn`}</Typography>
          <Typography variant="h5">{player.name}</Typography>
          <Stats {...player} />
        </Box>
      </Box>
    </Slide>
  );
});
