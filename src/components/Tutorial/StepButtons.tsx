import React from 'react';

import { Box, Button } from '@mui/material';

import { StepProps } from './types';

export const StepButtons: React.FC<StepProps> = ({
  handleBack,
  handleNext,
  handleSkip,
  isLastStep = false
}) => (
  <Box sx={{ alignSelf: 'flex-end', mt: 1 }}>
    {handleSkip && (
      <Button onClick={handleSkip} sx={{ mr: 1 }}>
        Skip Tutorial
      </Button>
    )}
    {handleBack && (
      <Button onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
    )}
    <Button variant="contained" onClick={handleNext}>
      {isLastStep ? 'Go To Game' : 'Continue'}
    </Button>
  </Box>
);
