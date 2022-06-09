import React from 'react';

import { Typography } from '@mui/material';

export const MultiCaptureMovement = () => (
  <>
    <img
      src="https://ik.imagekit.io/a26m6rvtk/img/multi_capture_EwrykTyKh.png/tr:h-300"
      alt="Multi Capture Movement"
      height={300}
    />

    <Typography component="p" sx={{ mt: 1, mb: 1 }}>
      When a player can make subsequents Capture Movement it means it is a Multi
      Capture Movement!
    </Typography>

    <Typography component="p">
      That means you can remove from the game multi Discs from your opponent.
    </Typography>
  </>
);
