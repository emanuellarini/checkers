import React from 'react';

import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';

export const Paused = () => (
  <Dialog open sx={{ textAlign: 'center' }}>
    <DialogTitle>Game is paused!</DialogTitle>
    <DialogContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      Waiting for the other player to unpause
    </DialogContent>
  </Dialog>
);
