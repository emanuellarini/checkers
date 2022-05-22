import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { useGame } from '../../hooks';

const SlideTransition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export const Win = () => {
  const { winner, onResetGame } = useGame();

  return (
    <Dialog
      open={!!winner}
      TransitionComponent={SlideTransition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>We have a winner!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Player {winner} has won the game! Congratulations!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onResetGame} aria-label="Restart Game">
          Restart Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};
