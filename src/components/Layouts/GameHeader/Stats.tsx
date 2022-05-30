import React, { memo } from 'react';

import { Box, Typography } from '@mui/material';

import { Stat } from './Stat';
import { flexColumnStyle } from './styles';

export const Stats: React.FC<
  Pick<Player, 'wins' | 'losses' | 'capturedDiscs' | 'capturedKings'>
> = memo(({ wins, losses, capturedDiscs, capturedKings }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      p: 1
    }}
  >
    <Box sx={{ ...flexColumnStyle, mr: 2 }}>
      <Typography variant="overline" component="span">
        Overall
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        <Stat color="success.main" value={wins || 0} label="Wins" />
        <Stat color="error.main" value={losses || 0} label="Losses" />
      </Box>
    </Box>

    <Box sx={flexColumnStyle}>
      <Typography variant="overline" component="span">
        This Game
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        <Stat color="info.main" value={capturedDiscs || 0} label="Discs" />
        <Stat color="warning.main" value={capturedKings || 0} label="Kings" />
      </Box>
    </Box>
  </Box>
));
