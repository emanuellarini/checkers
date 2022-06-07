import React from 'react';

import { Typography } from '@mui/material';

import multiCaptureImg from '../../assets/img/multi_capture.png';

export const MultiCaptureMovement = () => (
  <>
    <img src={multiCaptureImg} alt="Multi Capture Movement" />

    <Typography component="p" sx={{ mt: 1, mb: 1 }}>
      When a player can make subsequents Capture Movement it means it is a Multi
      Capture Movement!
    </Typography>

    <Typography component="p">
      That means you can remove from the game multi Discs from your opponent.
    </Typography>
  </>
);
