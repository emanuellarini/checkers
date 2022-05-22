import React, { memo } from 'react';

import { Box, Typography } from '@mui/material';

import { Stat } from './Stat';
import { flexColumnStyle } from './styles';

export const Stats: React.FC<{ gameStats: Player['gameStats'] }> = memo(
  ({ gameStats }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        p: 1
      }}
    >
      <Box sx={{ ...flexColumnStyle, mr: 2 }}>
        <Typography variant="overline">Overall</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <Stat color="success.main" value={gameStats.wins} label="Wins" />
          <Stat color="error.main" value={gameStats.losses} label="Losses" />
        </Box>
      </Box>

      <Box sx={flexColumnStyle}>
        <Typography variant="overline">This Game</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <Stat color="info.main" value={gameStats.discs} label="Discs" />
          <Stat color="warning.main" value={gameStats.kings} label="Kings" />
        </Box>
      </Box>
    </Box>
  )
);
