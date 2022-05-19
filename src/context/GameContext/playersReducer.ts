export type PlayersStateType = { [k: string]: Player };

export const playersInitialState: PlayersStateType = {
  1: {
    wins: 0,
    losses: 0,
    captures: 0,
    captured: 0
  },
  2: {
    wins: 0,
    losses: 0,
    captures: 0,
    captured: 0
  }
};

// export type PlayersActionType;

export const playersReducer = (
  state: PlayersStateType
  // action: PlayersActionType
): PlayersStateType => {
  return state;
};
