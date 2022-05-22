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

export type IncrementProp = {
  type: 'INCREMENT_PROP';
  payload: {
    player: number;
    prop: keyof Player;
  };
};

type PlayersActionType = IncrementProp;

export const playersReducer = (
  state: PlayersStateType,
  action: PlayersActionType
): PlayersStateType => {
  if (action.type === 'INCREMENT_PROP') {
    const { player, prop } = action.payload;

    return {
      ...state,
      [player]: {
        ...state[player],
        [prop]: state[player][prop] + 1
      }
    };
  }

  return state;
};
