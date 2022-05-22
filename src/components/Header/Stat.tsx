import React, { memo } from 'react';

import { Box, Typography } from '@mui/material';

import { flexColumnStyle } from './styles';

export const Stat: React.FC<{ label: string; value: number; color: string }> =
  memo(({ label, value, color }) => (
    <Box
      sx={{
        ...flexColumnStyle,
        m: '0.5em 1em',
        maxWidth: '3em',
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h5"
        color={color}
        aria-label={label}
        component="span"
      >
        {value}
      </Typography>
      <Typography color={color}>{label}</Typography>
    </Box>
  ));
