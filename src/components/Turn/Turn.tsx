import React, { useEffect, useMemo } from 'react';

import { ArrowRightAlt } from '@mui/icons-material';
import { Button, Slide } from '@mui/material';

import { useRoom } from '../../hooks';

export const Turn = () => {
  const { turn, movements, onEndTurn, winner, players, sessionId } = useRoom();

  const canPassTurn = useMemo(() => {
    const currentSessionPlayer = players.find(p => p.sessionId === sessionId);

    return turn === currentSessionPlayer?.id && movements > 0;
  }, [players, sessionId, movements]);

  useEffect(() => {
    const handleSpaceBarPress = (e: KeyboardEvent) => {
      if (!canPassTurn || winner) return;

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
  }, [canPassTurn, winner, onEndTurn]);

  const color = turn === 0 ? 'primary' : 'secondary';

  return (
    <Slide
      key={`button-turn-player-${turn}`}
      direction="up"
      in={canPassTurn}
      mountOnEnter
      unmountOnExit
    >
      <Button
        variant="contained"
        aria-label="Pass Turn"
        onClick={onEndTurn}
        disabled={!canPassTurn}
        color={color}
        size="large"
        sx={{
          position: 'fixed',
          bottom: '2em',
          right: '2em'
        }}
      >
        Pass Turn
        <ArrowRightAlt sx={{ ml: 1 }} />
      </Button>
    </Slide>
  );
};
