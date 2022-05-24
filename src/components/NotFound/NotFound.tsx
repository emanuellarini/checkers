import React from 'react';

import { Button, Box, Paper, Typography } from '@mui/material';
import { navigate, RouteComponentProps } from '@reach/router';

import { Disc } from '../Disc';
import { DefaultHeader } from '../Header';
import { Square } from '../Square';

const missingDiscPositions = [1, 7, 13, 18, 19, 24, 25];
const zeroPositions = [3, 4, 5, 12, 14, 21, 22, 23];

export const NotFound: React.FC<RouteComponentProps> = () => (
  <>
    <DefaultHeader />
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant="overline"
        color="inherit"
        sx={{
          textAlign: 'center',
          mt: 3,
          mb: 0,
          textTransform: 'uppercase',
          fontSize: '2em',
          lineHeight: 1
        }}
      >
        Game Not Found :(
      </Typography>
      <Typography
        variant="subtitle2"
        color="inherit"
        sx={{
          mt: 0,
          mb: 2,
          textAlign: 'center',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center'
        }}
        component="div"
      >
        Wanna create a new game?{' '}
        <Button variant="text" onClick={() => navigate('/')} sx={{ mb: 0.1 }}>
          click here
        </Button>
      </Typography>
      <Paper
        elevation={4}
        sx={{
          width: '80%',
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          justifyContent: 'center',
          border: '1.25em ridge #492510',
          m: '0 auto'
        }}
      >
        {Array.from({ length: 27 }).map((_, k) => (
          <Square isDarkSquare={k % 2 === 0} key={k}>
            {!missingDiscPositions.includes(k) && (
              <Disc
                player={!zeroPositions.includes(k) ? 1 : 0}
                isKing={false}
              />
            )}
          </Square>
        ))}
      </Paper>
    </Box>
  </>
);
