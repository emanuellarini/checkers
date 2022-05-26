import React, {
  useReducer,
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect
} from 'react';

import { defaultDiscs } from 'src/lib/defaultDiscs';

import { useRoom } from '../../hooks';
import { defaultSquares } from '../../lib/defaultSquares';
import { getIsKingDisc } from '../../lib/disc';
import {
  calculatePlayerMovablePositions,
  calculatePlayerMovablePositionsWhenMultiCapturing,
  getCapturedDiscPosition
} from '../../lib/movement';
import { hasWonThisTurn } from '../../lib/win';
import {
  moveDisc,
  setMovements,
  setTurn,
  resetGame,
  removeDisc,
  setPlayerStat
} from '../../services/firebase';
import { discsReducer } from './discsReducer';

type GameContext = {
  turn: Game['turn'];
  movements: Game['movements'];
  winner: Turn | null;
  players: Game['players'];
  discs: Game['discs'];
  squares: Game['squares'];
  movablePositions: Position[];
  onStartMovement: (position: Position) => void;
  onEndMovement: (currentPosition: Position, newPosition: Position) => void;
  onResetGame: () => void;
  onEndTurn: () => void;
};

export type GameProviderProps = {
  children: React.ReactNode;
  gameId: string;
  players: Game['players'];
  discs: Game['discs'];
  gameStats: {
    turn: Game['turn'];
    movements: Game['movements'];
  };
};

const initialContext: GameContext = {
  turn: 0,
  movements: 0,
  winner: null,
  players: [],
  squares: defaultSquares,
  discs: defaultDiscs,
  movablePositions: [],
  onStartMovement: () => null,
  onEndMovement: () => null,
  onResetGame: () => null,
  onEndTurn: () => null
};

export const GameContext = createContext(initialContext);

export const GameProvider: React.FC<GameProviderProps> = ({
  children,
  gameId,
  discs: discsFromProps,
  players,
  gameStats
}) => {
  const { connectToRoom } = useRoom();

  useEffect(() => {
    connectToRoom({ gameId });
  }, [gameId, connectToRoom]);

  const [winner, onSetWinner] = useState<GameContext['winner']>(
    initialContext.winner
  );
  const [movablePositions, setMovablePositions] = useState<
    GameContext['movablePositions']
  >(initialContext.movablePositions);
  const [discs, discsDispatch] = useReducer(
    discsReducer,
    discsFromProps || initialContext.discs
  );

  const onEndTurn = useCallback(() => {
    setTurn(gameId, gameStats.turn === 0 ? 1 : 0);
    setMovements(gameId, 0);
  }, [gameId, gameStats]);

  const onStartMovement = useCallback<GameContext['onStartMovement']>(
    position => {
      setMovablePositions([]);

      let movablePositions;

      if (gameStats.movements === 0) {
        movablePositions = calculatePlayerMovablePositions(
          gameStats.turn,
          discs,
          position
        );
      } else {
        movablePositions = calculatePlayerMovablePositionsWhenMultiCapturing(
          gameStats.turn,
          discs,
          position
        );
      }

      setMovablePositions(movablePositions);
    },
    [setMovablePositions, discs, gameStats]
  );

  const onEndMovement = useCallback<GameContext['onEndMovement']>(
    (currentPosition, newPosition) => {
      const isKing = getIsKingDisc(
        newPosition,
        discs.find(disc => disc.position === currentPosition)
      );

      setMovements(gameId, gameStats.movements + 1);

      discsDispatch({
        type: 'MOVE_DISC',
        payload: {
          currentPosition,
          newPosition,
          isKing
        }
      });
      moveDisc(gameId, currentPosition, newPosition, isKing);

      const capturedPosition = getCapturedDiscPosition(
        discs,
        currentPosition,
        newPosition
      );

      if (capturedPosition) {
        discsDispatch({
          type: 'REMOVE_DISC',
          payload: capturedPosition
        });

        removeDisc(gameId, capturedPosition);
        const capturedDisc = discs.find(
          disc => disc.position === capturedPosition
        );
        if (capturedDisc?.isKing) {
          setPlayerStat(gameId, gameStats.turn, {
            capturedKings: players[gameStats.turn].gameStats.capturedKings + 1
          });
        } else {
          setPlayerStat(gameId, gameStats.turn, {
            capturedDiscs: players[gameStats.turn].gameStats.capturedDiscs + 1
          });
        }

        if (hasWonThisTurn(players, gameStats.turn, discs)) {
          setPlayerStat(gameId, gameStats.turn, {
            wins: players[gameStats.turn].gameStats.wins + 1
          });

          setPlayerStat(gameId, gameStats.turn === 1 ? 0 : 1, {
            losses: players[gameStats.turn].gameStats.losses + 1
          });

          onSetWinner(gameStats.turn);
        }
      }
    },
    [discs, gameId, players, gameStats, onSetWinner]
  );

  const onResetGame = useCallback<GameContext['onResetGame']>(() => {
    resetGame(gameId);
    onSetWinner(initialContext.winner);
  }, [gameId, onSetWinner]);

  const memoizedGame = useMemo(
    () => ({
      discs,
      players,
      winner,
      movablePositions,
      ...gameStats
    }),
    [gameStats, discs, players, winner, movablePositions]
  );

  return (
    <GameContext.Provider
      value={{
        ...memoizedGame,
        squares: initialContext.squares,
        onStartMovement,
        onEndMovement,
        onEndTurn,
        onResetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
