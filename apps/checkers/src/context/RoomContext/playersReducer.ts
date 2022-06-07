import { Player, PlayerKey, Game } from '@checkers/game-interfaces';

export type PlayersStateType = Game['players'];

export const playersInitialState: PlayersStateType = [];

type IncrementProp = {
  type: 'INCREMENT_PROP';
  payload: {
    player: PlayerKey;
    prop: keyof Pick<
      Player,
      'wins' | 'losses' | 'capturedDiscs' | 'capturedKings'
    >;
  };
};

type Initialize = {
  type: 'INITIALIZE';
  payload: PlayersStateType;
};

type Remove = {
  type: 'REMOVE_PLAYER';
  payload: PlayerKey;
};

type UpdatePlayer = {
  type: 'UPDATE_PLAYER';
  payload: {
    key: PlayerKey;
    player: Partial<Player>;
  };
};

type Reset = {
  type: 'RESET';
};

type PlayersActionType =
  | Initialize
  | UpdatePlayer
  | IncrementProp
  | Reset
  | Remove;

export const playersReducer = (
  state: PlayersStateType,
  action: PlayersActionType
): PlayersStateType => {
  if (action.type === 'INITIALIZE') {
    return action.payload;
  }

  if (action.type === 'REMOVE_PLAYER') {
    return state.filter((_, key) => key !== action.payload);
  }

  if (action.type === 'UPDATE_PLAYER') {
    return state.map((player, key) => {
      if (key === action.payload.key) {
        return {
          ...player,
          ...action.payload.player
        };
      }
      return player;
    });
  }

  if (action.type === 'INCREMENT_PROP') {
    const { player, prop } = action.payload;

    return state.map((data, k) => {
      if (player !== k) return data;

      const gameStats = {
        ...data,
        [prop]: data[prop] + 1
      };

      return {
        ...data,
        gameStats
      };
    });
  }

  if (action.type === 'RESET') {
    return state.map(data => ({
      ...data,
      capturedDiscs: 0,
      capturedKings: 0
    }));
  }

  return state;
};
