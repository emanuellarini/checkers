import React, { useMemo, memo } from 'react';

import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';

import { useRoom } from '../../hooks';

type PausedProps = {
  message?: React.ReactNode;
};

export const Paused: React.FC<PausedProps> = memo(
  ({ message: messageFromProps }) => {
    const { players } = useRoom();
    const message = useMemo(() => {
      if (messageFromProps) return messageFromProps;

      return players.length !== 2 || players.some(p => !p.isConnected)
        ? 'Waiting for the other player to unpause'
        : null;
    }, [messageFromProps, players]);

    if (!message) return null;

    return (
      <Dialog open sx={{ textAlign: 'center' }}>
        <DialogTitle aria-label="Paused">Game is paused!</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress sx={{ mb: 2 }} />
          {message}
        </DialogContent>
      </Dialog>
    );
  }
);
