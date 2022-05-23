import React, { createContext, useCallback, useState, useMemo } from 'react';
import { useList } from 'react-firebase-hooks/database';

import { getIsKingDisc } from '../../lib/disc';
import {
  getGameRef,
  moveDisc,
  setMovements,
  setTurn,
  resetBoard,
  removeDisc,
  setPlayerStat
} from '../../lib/firebase';
import {
  calculatePlayerMovablePositions,
  calculatePlayerMovablePositionsWhenMultiCapturing,
  getCapturedDiscPosition
} from '../../lib/movement';
import { hasWonThisTurn } from '../../lib/win';

type GameContext = {
  turn: Game['turn'];
  movements: Game['movements'];
  winner: Turn | null;
  players: Game['players'];
  board: Game['board'];
  movablePositions: Position[];
  onStartMovement: (position: Position) => void;
  onEndMovement: (currentPosition: Position, newPosition: Position) => void;
  onResetGame: () => void;
  onEndTurn: () => void;
};

type GameProviderProps = { children: React.ReactNode; gameId: string };

const initialContext: GameContext = {
  turn: 0,
  movements: 0,
  winner: null,
  players: [],
  board: {},
  movablePositions: [],
  onStartMovement: () => null,
  onEndMovement: () => null,
  onResetGame: () => null,
  onEndTurn: () => null
};

export const GameContext = createContext(initialContext);

export const GameProvider: React.FC<GameProviderProps> = ({
  children,
  gameId
}) => {
  const [snapshots, loading] = useList(getGameRef(gameId));
  const game = useMemo<Game>(() => {
    if (loading || !snapshots)
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
  const [winner, onSetWinner] = useState<GameContext['winner']>(
    initialContext.winner
  );
  const [movablePositions, setMovablePositions] = useState<
    GameContext['movablePositions']
  >(initialContext.movablePositions);

  const onEndTurn = useCallback(() => {
    setTurn(gameId, game.turn === 0 ? 1 : 0);
    setMovements(gameId, 0);
  }, [gameId, game]);

  const onStartMovement = useCallback<GameContext['onStartMovement']>(
    position => {
      setMovablePositions([]);

      let movablePositions;

      if (game.movements === 0) {
        movablePositions = calculatePlayerMovablePositions(
          game.turn,
          game.board,
          position
        );
      } else {
        movablePositions = calculatePlayerMovablePositionsWhenMultiCapturing(
          game.turn,
          game.board,
          position
        );
      }

      setMovablePositions(movablePositions);
    },
    [setMovablePositions, game]
  );

  const onEndMovement = useCallback<GameContext['onEndMovement']>(
    (currentPosition, newPosition) => {
      const isKing = getIsKingDisc(
        newPosition,
        game.board[currentPosition].disc
      );

      setMovements(gameId, game.movements + 1);
      moveDisc(gameId, currentPosition, newPosition, isKing);

      const capturedPosition = getCapturedDiscPosition(
        game.board,
        currentPosition,
        newPosition
      );

      if (capturedPosition) {
        removeDisc(gameId, capturedPosition);
        if (game.board[capturedPosition]?.disc?.isKing) {
          setPlayerStat(gameId, game.turn, {
            capturedKings: game.players[game.turn].gameStats.capturedKings + 1
          });
        } else {
          setPlayerStat(gameId, game.turn, {
            capturedDiscs: game.players[game.turn].gameStats.capturedDiscs + 1
          });
        }

        if (hasWonThisTurn(game.players, game.turn, game.board)) {
          setPlayerStat(gameId, game.turn, {
            wins: game.players[game.turn].gameStats.wins + 1
          });

          setPlayerStat(gameId, game.turn === 1 ? 0 : 1, {
            losses: game.players[game.turn].gameStats.losses + 1
          });

          onSetWinner(game.turn);
        }
      }
    },
    [gameId, game, onSetWinner]
  );

  const onResetGame = useCallback<GameContext['onResetGame']>(() => {
    resetBoard(gameId);
    setMovements(gameId, 0);
    onSetWinner(initialContext.winner);
  }, [gameId, onSetWinner]);

  const memoizedGame = useMemo(
    () => ({
      ...game,
      winner,
      movablePositions
    }),
    [game, winner, movablePositions]
  );

  return (
    <GameContext.Provider
      value={{
        ...memoizedGame,
        onStartMovement,
        onEndMovement,
        onEndTurn,
        onResetGame
      }}
    >
      {loading || !snapshots ? 'loading' : children}
    </GameContext.Provider>
  );
};
