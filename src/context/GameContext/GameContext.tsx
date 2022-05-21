import React, { createContext, useReducer, useCallback, useState } from 'react';

import {
  boardInitialState,
  boardReducer,
  BoardStateType,
  MoveDisc,
  RemoveDisc,
  SetIsDroppable
} from './boardReducer';
import {
  playersInitialState,
  playersReducer,
  PlayersStateType
} from './playersReducer';

type GameContext = {
  turn: number;
  players: PlayersStateType;
  board: BoardStateType;
  onMoveDisc: (payload: MoveDisc['payload']) => void;
  onSetIsDroppable: (payload: SetIsDroppable['payload']) => void;
  onSetCapturedDisc: (payload: RemoveDisc['payload']) => void;
  onSetUndroppableInAll: () => void;
  onIncrementTurnMovements: () => void;
  onEndTurn: () => void;
};

const initialContext: GameContext = {
  turn: 1,
  players: playersInitialState,
  board: boardInitialState,
  onMoveDisc: () => null,
  onSetIsDroppable: () => null,
  onSetCapturedDisc: () => null,
  onSetUndroppableInAll: () => null,
  onIncrementTurnMovements: () => null,
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

  const onMoveDisc = useCallback<GameContext['onMoveDisc']>(payload => {
    boardDispatch({
      type: 'MOVE_DISC',
      payload
    });
  }, []);

  const onSetIsDroppable = useCallback<GameContext['onSetIsDroppable']>(
    payload => {
      boardDispatch({
        type: 'SET_IS_DROPPABLE',
        payload
      });
    },
    []
  );

  const onSetUndroppableInAll = useCallback(() => {
    boardDispatch({
      type: 'SET_UNDROPPABLE_IN_ALL'
    });
  }, []);

  const onSetCapturedDisc = useCallback<GameContext['onSetCapturedDisc']>(
    payload => {
      boardDispatch({ type: 'REMOVE_DISC', payload });
    },
    []
  );

  const onIncrementTurnMovements = useCallback(() => {
    playersDispatch({ type: 'INCREMENT_TURN_MOVEMENT', payload: turn });
  }, [turn]);

  const onEndTurn = useCallback(() => {
    onSetTurn(turn === 1 ? 2 : 1);
    playersDispatch({
      type: 'RESET_TURN_MOVEMENT',
      payload: turn
    });
  }, [onSetTurn, turn]);

  return (
    <GameContext.Provider
      value={{
        turn,
        players,
        board,
        onMoveDisc,
        onSetIsDroppable,
        onSetCapturedDisc,
        onSetUndroppableInAll,
        onIncrementTurnMovements,
        onEndTurn
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
