import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useReducer,
  useCallback,
  useState
} from 'react';

import {
  DiscsStateType,
  discsReducer,
  discsInitialState,
  SetDiscNewCoordinates
} from './discsReducer';
import {
  playersInitialState,
  playersReducer,
  PlayersStateType
} from './playersReducer';
import {
  SquaresStateType,
  squaresInitialState,
  squaresReducer,
  SetIsDroppable
} from './squaresReducer';

type GameContext = {
  turn: number;
  players: PlayersStateType;
  squares: SquaresStateType;
  discs: DiscsStateType;
  onSetDiscNewCoordinates: (payload: SetDiscNewCoordinates['payload']) => void;
  onSetIsDroppable: (payload: SetIsDroppable['payload']) => void;
  onSetUndroppableInAll: () => void;
  onSetTurn: Dispatch<SetStateAction<number>>;
};

const initialContext: GameContext = {
  turn: 1,
  players: playersInitialState,
  squares: squaresInitialState,
  discs: discsInitialState,
  onSetDiscNewCoordinates: () => null,
  onSetIsDroppable: () => null,
  onSetUndroppableInAll: () => null,
  onSetTurn: () => null
};

export const GameContext = createContext(initialContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [players] = useReducer(playersReducer, initialContext.players);
  const [squares, squaresDispatch] = useReducer(
    squaresReducer,
    initialContext.squares
  );
  const [discs, discsDispatch] = useReducer(discsReducer, initialContext.discs);
  const [turn, onSetTurn] = useState<GameContext['turn']>(initialContext.turn);

  const onSetDiscNewCoordinates = useCallback<
    GameContext['onSetDiscNewCoordinates']
  >(payload => {
    discsDispatch({
      type: 'SET_DISC_NEW_COORDINATES',
      payload
    });
  }, []);

  const onSetIsDroppable = useCallback<GameContext['onSetIsDroppable']>(
    payload => {
      squaresDispatch({
        type: 'SET_IS_DROPPABLE',
        payload
      });
    },
    []
  );

  const onSetUndroppableInAll = useCallback(() => {
    squaresDispatch({
      type: 'SET_UNDROPPABLE_IN_ALL'
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        turn,
        players,
        squares,
        discs,
        onSetDiscNewCoordinates,
        onSetIsDroppable,
        onSetUndroppableInAll,
        onSetTurn
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
