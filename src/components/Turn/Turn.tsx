import React, { useEffect } from 'react';

import { ArrowRightAlt } from '@mui/icons-material';
import { Button, Slide } from '@mui/material';

import { useGame } from '../../hooks';
import text from '../../lib/text';

export const Turn = () => {
  const { turn, movements, onEndTurn } = useGame();

  useEffect(() => {
    const handleSpaceBarPress = (e: KeyboardEvent) => {
      if (!movements) return;

      e.preventDefault();
      e.stopPropagation();
      if (e.code === 'Space') {
        onEndTurn();
      }
    };

    window.addEventListener('keydown', handleSpaceBarPress);

    return () => {
      window.removeEventListener('keydown', handleSpaceBarPress);
    };
  }, [movements, onEndTurn]);

  if (!movements) return null;

  const color = turn === 1 ? 'primary' : 'secondary';

  return (
    <Slide key={`button-turn-player-${turn}`} direction="up" in>
      <Button
        variant="contained"
        aria-label="Pass Turn"
        onClick={onEndTurn}
        color={color}
        size="large"
        sx={{
          position: 'fixed',
          bottom: '2em',
          right: '2em'
        }}
      >
        {text.button.pass_turn}
        <ArrowRightAlt sx={{ ml: 1 }} />
      </Button>
    </Slide>
  );
};
