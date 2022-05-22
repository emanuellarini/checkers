export type PlayersStateType = Players;

export const playersInitialState: PlayersStateType = {
  1: {
    name: 'John Doe',
    email: '',
    gameStats: {
      wins: 0,
      losses: 0,
      discs: 0,
      kings: 0
    }
  },
  2: {
    name: 'Mary Jane',
    email: '',
    gameStats: {
      wins: 0,
      losses: 0,
      discs: 0,
      kings: 0
    }
  }
};

type IncrementProp = {
  type: 'INCREMENT_PROP';
  payload: {
    player: keyof Players;
    prop: keyof Player['gameStats'];
  };
};

type Reset = {
  type: 'RESET';
};

type PlayersActionType = IncrementProp | Reset;

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
        gameStats: {
          ...state[player].gameStats,
          [prop]: Number(state[player].gameStats[prop]) + 1
        }
      }
    };
  }

  if (action.type === 'RESET') {
    return {
      ...state,
      1: {
        ...state[1],
        gameStats: {
          ...state[1].gameStats,
          discs: 0,
          kings: 0
        }
      },
      2: {
        ...state[2],
        gameStats: {
          ...state[2].gameStats,
          discs: 0,
          kings: 0
        }
      }
    };
  }

  return state;
};
