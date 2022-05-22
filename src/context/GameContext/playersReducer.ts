export type PlayersStateType = Players;

export const playersInitialState: PlayersStateType = [
  {
    name: 'John Doe',
    email: 'jon.doe@gmail2.com',
    gameStats: {
      wins: 0,
      losses: 0,
      capturedDiscs: 0,
      capturedKings: 0
    }
  },
  {
    name: 'Mary Jane',
    email: 'mary.jane@gmail2.com',
    gameStats: {
      wins: 0,
      losses: 0,
      capturedDiscs: 0,
      capturedKings: 0
    }
  }
];

type IncrementProp = {
  type: 'INCREMENT_PROP';
  payload: {
    player: PlayerKey;
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

    return state.map((data, k) => {
      const gameStats = {
        ...data.gameStats,
        [prop]: data.gameStats[prop] + 1
      };

      return {
        ...data,
        gameStats: {
          ...data.gameStats,
          ...(player === k ? gameStats : {})
        }
      };
    });
  }

  if (action.type === 'RESET') {
    return state.map(data => ({
      ...data,
      gameStats: {
        ...data.gameStats,
        capturedDiscs: 0,
        capturedKings: 0
      }
    }));
  }

  return state;
};
