import { Disc, Position, Game } from '@checkers/game-interfaces';

export type DiscsStateType = Game['discs'];

export const discsInitialState: DiscsStateType = [];

type Initialize = {
  type: 'INITIALIZE';
  payload: DiscsStateType;
};

type UpdateDisc = {
  type: 'UPDATE_DISC';
  payload: Disc;
};

type RemoveDisc = {
  type: 'REMOVE_DISC';
  payload: Position;
};

type Reset = {
  type: 'RESET';
};

export type DiscsActionType = Initialize | Reset | RemoveDisc | UpdateDisc;

export const discsReducer = (
  state: DiscsStateType,
  action: DiscsActionType
): DiscsStateType => {
  if (action.type === 'INITIALIZE') {
    return action.payload;
  }

  if (action.type === 'REMOVE_DISC') {
    return state.filter(disc => disc.position !== action.payload);
  }

  if (action.type === 'UPDATE_DISC') {
    return state.map(disc => {
      if (disc.id === action.payload.id) {
        return action.payload;
      }

      return disc;
    });
  }

  if (action.type === 'RESET') {
    return discsInitialState;
  }

  return state;
};
