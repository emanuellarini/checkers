import React, {
  createContext,
  useReducer,
  useCallback,
  useState,
  useMemo
} from 'react';

import {
  calculatePlayerMovablePositions,
  calculatePlayerMovablePositionsWhenMultiCapturing,
  getCapturedDiscPosition
} from '../../lib/movement';
import {
  boardInitialState,
  boardReducer,
  BoardStateType
} from './boardReducer';
import {
  playersInitialState,
  playersReducer,
  PlayersStateType
} from './playersReducer';

type GameContext = {
  turn: number;
  movements: number;
  players: PlayersStateType;
  board: BoardStateType;
  onStartMovement: (position: Position) => void;
  onEndMovement: (currentPosition: Position, newPosition: Position) => void;
  onEndTurn: () => void;
};

const initialContext: GameContext = {
  turn: 1,
  movements: 0,
  players: playersInitialState,
  board: boardInitialState,
  onStartMovement: () => null,
  onEndMovement: () => null,
  onEndTurn: () => null
};

export const GameContext = createContext(initialContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [players, playersDispatch] = useReducer(
    playersReducer,
    initialContext.players
  );
  const [board, boardDispatch] = useReducer(boardReducer, initialContext.board);
  const [turn, onSetTurn] = useState<GameContext['turn']>(initialContext.turn);
  const [movements, onSetMovements] = useState<number>(
    initialContext.movements
  );

  const onEndTurn = useCallback(() => {
    onSetTurn(turn === 1 ? 2 : 1);
    onSetMovements(0);
  }, [onSetTurn, turn]);

  const onStartMovement = useCallback<GameContext['onStartMovement']>(
    position => {
      let movablePositions;

      if (movements === 0) {
        movablePositions = calculatePlayerMovablePositions(
          turn,
          board,
          position
        );
      } else {
        movablePositions = calculatePlayerMovablePositionsWhenMultiCapturing(
          turn,
          board,
          position
        );
      }

      boardDispatch({
        type: 'SET_DROPPABLE',
        payload: movablePositions
      });
    },
    [board, movements, turn]
  );

  const onEndMovement = useCallback<GameContext['onEndMovement']>(
    (currentPosition, newPosition) => {
      boardDispatch({
        type: 'MOVE_DISC',
        payload: {
          currentPosition,
          newPosition
        }
      });

      const capturedPosition = getCapturedDiscPosition(
        board,
        currentPosition,
        newPosition
      );

      if (capturedPosition) {
        boardDispatch({ type: 'REMOVE_DISC', payload: capturedPosition });
        playersDispatch({
          type: 'INCREMENT_PROP',
          payload: {
            player: turn === 1 ? 2 : 1,
            prop: 'captured'
          }
        });
        playersDispatch({
          type: 'INCREMENT_PROP',
          payload: {
            player: turn,
            prop: 'captures'
          }
        });
      }

      onSetMovements(movements + 1);
    },
    [board, turn, movements, onSetMovements]
  );

  const memoizedGame = useMemo(
    () => ({
      turn,
      players,
      board,
      movements
    }),
    [turn, players, board, movements]
  );

  return (
    <GameContext.Provider
      value={{
        ...memoizedGame,
        onStartMovement,
        onEndMovement,
        onEndTurn
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
