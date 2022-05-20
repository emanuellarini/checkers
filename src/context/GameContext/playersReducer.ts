export type PlayersStateType = { [k: string]: Player };

export const playersInitialState: PlayersStateType = {
  1: {
    wins: 0,
    losses: 0,
    captures: 0,
    captured: 0,
    turnMovements: 0
  },
  2: {
    wins: 0,
    losses: 0,
    captures: 0,
    captured: 0,
    turnMovements: 0
  }
};

export type IncrementTurnMovement = {
  type: 'INCREMENT_TURN_MOVEMENT';
  payload: number; // player id
};

export type ResetTurnMovement = {
  type: 'RESET_TURN_MOVEMENT';
  payload: number; // player id
};

type PlayersActionType = IncrementTurnMovement | ResetTurnMovement;

export const playersReducer = (
  state: PlayersStateType,
  action: PlayersActionType
): PlayersStateType => {
  if (action.type === 'INCREMENT_TURN_MOVEMENT') {
    return {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        turnMovements: state[action.payload].turnMovements + 1
      }
    };
  }

  if (action.type === 'RESET_TURN_MOVEMENT') {
    return {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        turnMovements: 0
      }
    };
  }

  return state;
};
