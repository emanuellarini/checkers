import React, { useMemo } from 'react';
import {
  useDocumentData,
  useCollectionData,
  useCollectionDataOnce
} from 'react-firebase-hooks/firestore';

import { Container, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import { Board, Header, Turn, Win, Hint, Loading } from '../components';
import { GameProvider, GameProviderProps } from '../context';
import { getGameRef, getDiscsRef, getPlayersRef } from '../services/firebase';
import NotFound from './404';

const Play = () => {
  const { query } = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxWidth = matches ? '100%' : '80%';
  const gameId = query.gameId as GameProviderProps['gameId'];
  const [gameStats, isLoadingGame, gameStatsError] = useDocumentData(
    getGameRef(gameId)
  );
  const [discs, isLoadingDiscs, discsError] = useCollectionDataOnce(
    getDiscsRef(gameId)
  );
  const [players, isLoadingPlayers, playersError] = useCollectionData(
    getPlayersRef(gameId)
  );

  const isLoading = isLoadingGame || isLoadingPlayers || isLoadingDiscs;

  const game = useMemo(() => {
    if (isLoading || !gameStats || !discs || !players)
      return {
        players: [],
        discs: [],
        gameStats: {
          turn: 0,
          movements: 0
        }
      };

    return {
      gameStats,
      discs,
      players
    };
  }, [isLoading, discs, gameStats, players]);

  const hasError =
    !gameId ||
    !game.players?.length ||
    gameStatsError ||
    discsError ||
    playersError;

  if (isLoading) {
    return <Loading message="Searching your game..." />;
  }

  if (hasError) {
    return <NotFound />;
  }

  return (
    <GameProvider
      discs={discs as GameProviderProps['discs']}
      gameStats={gameStats as GameProviderProps['gameStats']}
      players={players as GameProviderProps['players']}
      gameId={gameId}
    >
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

export default Play;
