import React, { useMemo } from 'react';
import {
  useDocumentData,
  useCollectionData
} from 'react-firebase-hooks/firestore';

import { Container, Paper, useMediaQuery, useTheme } from '@mui/material';
import { RouteComponentProps } from '@reach/router';

import {
  Board,
  Header,
  Turn,
  Win,
  Hint,
  Loading,
  NotFound
} from '../components';
import { GameProvider, GameProviderProps } from '../context';
import { getGameRef, getBoardRef, getPlayersRef } from '../services/firebase';

type PlayProps = RouteComponentProps & {
  gameId?: GameProviderProps['gameId'];
};

export const Play: React.FC<PlayProps> = ({ gameId }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxWidth = matches ? '100%' : '80%';
  const [gameStats, isLoadingGame, gameStatsError] = useDocumentData(
    getGameRef(gameId)
  );
  const [board, isLoadingBoard, boardError] = useCollectionData(
    getBoardRef(gameId)
  );
  const [players, isLoadingPlayers, playersError] = useCollectionData(
    getPlayersRef(gameId)
  );

  const game = useMemo(() => {
    if (
      isLoadingGame ||
      isLoadingBoard ||
      !gameStats ||
      !board ||
      isLoadingPlayers ||
      !players
    )
      return {
        players: [],
        board: [],
        turn: 0,
        movements: 0
      };

    return {
      ...gameStats,
      board,
      players
    };
  }, [
    isLoadingGame,
    isLoadingBoard,
    isLoadingPlayers,
    board,
    gameStats,
    players
  ]);

  if (isLoadingGame || isLoadingPlayers || isLoadingBoard) {
    return <Loading message="Searching your game..." />;
  }

  if (
    !gameId ||
    !game.players?.length ||
    gameStatsError ||
    boardError ||
    playersError
  ) {
    return <NotFound />;
  }

  return (
    <GameProvider game={game as Game} gameId={gameId}>
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
