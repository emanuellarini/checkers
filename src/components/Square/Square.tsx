import React from 'react';

import { Box } from '@mui/material';

export type SquareProps = {
  children: React.ReactNode;
};

export const Square: React.FC<SquareProps> = ({ children }) => (
  <Box
    aria-label="Square"
    sx={{
      position: 'relative',
      backgroundColor: '#bcaa99',
      pt: '100%', // this is what gives the size!
      '&:nth-of-type(-2n+8)': {
        backgroundColor: '#88665d'
      },
      '&:nth-of-type(8) ~ *:nth-of-type(-2n+15)': {
        backgroundColor: '#88665d'
      },
      '&:nth-of-type(16) ~ *:nth-of-type(-2n+24)': {
        backgroundColor: '#88665d'
      },
      '&:nth-of-type(24) ~ *:nth-of-type(-2n+31)': {
        backgroundColor: '#88665d'
      },
      '&:nth-of-type(32) ~ *:nth-of-type(-2n+40)': {
        backgroundColor: '#88665d'
      },
      '&:nth-of-type(40) ~ *:nth-of-type(-2n+47)': {
        backgroundColor: '#88665d'
      },
      '&:nth-of-type(48) ~ *:nth-of-type(-2n+56)': {
        backgroundColor: '#88665d'
      },
      '&:nth-of-type(56) ~ *:nth-of-type(-2n+63)': {
        backgroundColor: '#88665d'
      }
    }}
  >
    {children}
  </Box>
);
