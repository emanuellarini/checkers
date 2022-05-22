import React, {
  createContext,
  useReducer,
  useCallback,
  useState,
  useMemo
} from 'react';

import { getIsKingDisc } from '../../lib/disc';
import {
  calculatePlayerMovablePositions,
  calculatePlayerMovablePositionsWhenMultiCapturing,
  getCapturedDiscPosition
} from '../../lib/movement';
import { hasWonThisTurn } from '../../lib/win';
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
  turn: Turn;
  movements: number;
  winner: Turn | null;
  players: PlayersStateType;
  board: BoardStateType;
  onStartMovement: (position: Position) => void;
  onEndMovement: (currentPosition: Position, newPosition: Position) => void;
  onResetGame: () => void;
  onEndTurn: () => void;
};

const initialContext: GameContext = {
  turn: 1,
  movements: 0,
  winner: null,
  players: playersInitialState,
  board: boardInitialState,
  onStartMovement: () => null,
  onEndMovement: () => null,
  onResetGame: () => null,
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
  const [movements, onSetMovements] = useState<GameContext['movements']>(
    initialContext.movements
  );
  const [winner, onSetWinner] = useState<GameContext['winner']>(
    initialContext.winner
  );

  const onEndTurn = useCallback(() => {
    onSetTurn(turn === 1 ? 2 : 1);
    onSetMovements(initialContext.movements);
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
      const isKing = getIsKingDisc(newPosition, board[currentPosition].disc);

      onSetMovements(movements + 1);

      boardDispatch({
        type: 'MOVE_DISC',
        payload: {
          currentPosition,
          newPosition,
          isKing
        }
      });

      const capturedPosition = getCapturedDiscPosition(
        board,
        currentPosition,
        newPosition
      );

      if (capturedPosition) {
        boardDispatch({ type: 'REMOVE_DISC', payload: capturedPosition });
        if (board[capturedPosition]?.disc?.isKing) {
          playersDispatch({
            type: 'INCREMENT_PROP',
            payload: {
              player: turn,
              prop: 'kings'
            }
          });
        } else {
          playersDispatch({
            type: 'INCREMENT_PROP',
            payload: {
              player: turn,
              prop: 'discs'
            }
          });
        }

        if (hasWonThisTurn(players, turn, board)) {
          playersDispatch({
            type: 'INCREMENT_PROP',
            payload: {
              player: turn,
              prop: 'wins'
            }
          });

          playersDispatch({
            type: 'INCREMENT_PROP',
            payload: {
              player: turn === 1 ? 2 : 1,
              prop: 'losses'
            }
          });

          onSetWinner(turn);
        }
      }
    },
    [board, turn, movements, onSetMovements, players, onSetWinner]
  );

  const onResetGame = useCallback<GameContext['onResetGame']>(() => {
    boardDispatch({
      type: 'RESET'
    });

    playersDispatch({
      type: 'RESET'
    });

    onSetMovements(initialContext.movements);
    onSetWinner(initialContext.winner);
  }, [onSetWinner, onSetMovements]);

  const memoizedGame = useMemo(
    () => ({
      turn,
      players,
      board,
      movements,
      winner
    }),
    [turn, players, board, movements, winner]
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
      {children}
    </GameContext.Provider>
  );
};
