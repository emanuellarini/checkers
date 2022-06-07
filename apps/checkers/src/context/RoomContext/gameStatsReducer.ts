import { PlayerKey, GameStats } from '@checkers/game-interfaces';

export type GameStatsStateType = GameStats;

export const gameStatsInitialState: GameStatsStateType = {
  turn: 0,
  movements: 0,
  winner: -1
};

type Initialize = {
  type: 'INITIALIZE';
  payload: GameStatsStateType;
};

type SetMovements = {
  type: 'SET_MOVEMENTS';
  payload: number;
};

type SetWinner = {
  type: 'SET_WINNER';
  payload: PlayerKey;
};

type SetTurn = {
  type: 'SET_TURN';
  payload: PlayerKey;
};

type GameStatsActionType = Initialize | SetTurn | SetWinner | SetMovements;

export const gameStatsReducer = (
  state: GameStatsStateType,
  action: GameStatsActionType
): GameStatsStateType => {
  if (action.type === 'INITIALIZE') {
    return {
      turn: action.payload.turn,
      movements: action.payload.movements,
      winner: action.payload.winner
    };
  }

  if (action.type === 'SET_MOVEMENTS') {
    return {
      ...state,
      movements: action.payload
    };
  }

  if (action.type === 'SET_WINNER') {
    return {
      ...state,
      winner: action.payload
    };
  }

  if (action.type === 'SET_TURN') {
    return {
      ...state,
      turn: action.payload
    };
  }

  return state;
};
