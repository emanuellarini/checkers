import React, { useState } from 'react';

import { Stepper, Step, StepContent, StepLabel, Box } from '@mui/material';

import { GameSetup } from './GameSetup';
import { MultiCaptureMovement } from './MultiCaptureMovement';
import { RegularMovements } from './RegularMovements';
import { StepButtons } from './StepButtons';
import { TheBoard } from './TheBoard';
import { TheKingDIsc } from './TheKingDIsc';
import { WinConditions } from './WinConditions';

const steps: { [k: string]: React.ReactNode } = {
  'Game Setup': <GameSetup />,
  Board: <TheBoard />,
  'Regular Movements': <RegularMovements />,
  'Multi Capture Movement': <MultiCaptureMovement />,
  'The King Disc': <TheKingDIsc />,
  'Win Conditions': <WinConditions />
};

export const Tutorial: React.FC<{
  setTutorialDone: (isDone: boolean) => void;
}> = ({ setTutorialDone }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const handleFinish = () => setTutorialDone(true);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 64px)'
      }}
    >
      <Box
        sx={{
          maxWidth: '40em',
          m: '0 auto',
          mt: 3
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {Object.keys(steps).map(label => (
            <Step key={label}>
              <StepLabel sx={{ fontWeight: 'fontWeightBold' }}>
                {label}
              </StepLabel>
              <StepContent>
                {steps[label]}
                <StepButtons
                  isLastStep={activeStep + 1 === Object.keys(steps).length}
                  handleNext={
                    activeStep + 1 === Object.keys(steps).length
                      ? handleFinish
                      : handleNext
                  }
                  handleBack={activeStep !== 0 ? handleBack : undefined}
                  handleSkip={activeStep === 0 ? handleFinish : undefined}
                />
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};
