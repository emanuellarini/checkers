import React, { memo, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button
} from '@mui/material';

import { Paused } from '../';
import { useRoom } from '../../hooks';

export const Win = memo(() => {
  const { winner, players, onConfirmRematch } = useRoom();
  const [confirmedRematch, setConfirmedRematch] = useState(false);

  const handleRematch = async () => {
    await onConfirmRematch();
    setConfirmedRematch(true);
  };

  // once other player confirms we won't have a winner because of socket update :)
  if (winner === -1) return null;

  if (confirmedRematch)
    return <Paused message="Waiting for other player confirmation" />;

  return (
    <Dialog open keepMounted aria-describedby="alert-dialog-slide-description">
      <DialogTitle>We have a winner!</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          aria-label="Winner"
        >
          Player <b>{players[winner]?.name}</b> has won the game!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRematch} aria-label="Rematch">
          Rematch
        </Button>
      </DialogActions>
    </Dialog>
  );
});
