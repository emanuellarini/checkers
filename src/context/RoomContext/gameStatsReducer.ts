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

type PassTurn = {
  type: 'PASS_TURN';
};

type GameStatsActionType = Initialize | SetWinner | SetMovements | PassTurn;

export const gameStatsReducer = (
  state: GameStatsStateType,
  action: GameStatsActionType
): GameStatsStateType => {
  if (action.type === 'INITIALIZE') {
    return action.payload;
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

  if (action.type === 'PASS_TURN') {
    return {
      ...state,
      turn: state.turn === 0 ? 1 : 0
    };
  }

  return state;
};
