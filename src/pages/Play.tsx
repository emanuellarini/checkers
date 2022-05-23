import React, { useMemo } from 'react';
import { useList } from 'react-firebase-hooks/database';

import { Container, Paper, useMediaQuery, useTheme } from '@mui/material';
import { RouteComponentProps } from '@reach/router';

import {
  Board,
  Header,
  DefaultHeader,
  Turn,
  Win,
  Hint,
  Loading,
  NotFound
} from '../components';
import { GameProvider, GameProviderProps } from '../context';
import { getGameRef } from '../services/firebase';

type PlayProps = RouteComponentProps & {
  gameId?: GameProviderProps['gameId'];
};

export const Play: React.FC<PlayProps> = ({ gameId }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxWidth = matches ? '100%' : '80%';
  const [snapshots, loading] = useList(getGameRef(gameId));
  const game = useMemo<Game>(() => {
    if (loading || !snapshots?.length)
      return {
        players: [],
        board: {},
        turn: 0,
        movements: 0
      };

    return snapshots.reduce((acc, v) => {
      acc[v.key as keyof Game] = v.val();
      return acc;
    }, {} as Game);
  }, [snapshots, loading]);

  if (loading) {
    return <Loading message="Searching your game..." />;
  }

  if (!gameId || !snapshots?.length) {
    return (
      <>
        <DefaultHeader />
        <NotFound />
      </>
    );
  }

  return (
    <GameProvider game={game} gameId={gameId}>
      <Header />
      <Container sx={{ mt: 1, mb: 4 }}>
        <Hint />
        <Paper
          elevation={4}
          sx={{
            maxWidth,
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            justifyContent: 'center',
            border: '1.25em ridge #492510',
            m: '0 auto'
          }}
        >
          <Board />
          <Turn />
        </Paper>
      </Container>
      <Win />
    </GameProvider>
  );
};
