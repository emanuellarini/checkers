import { getDiscKey } from '../../lib/disc';

export type DiscsStateType = Discs;

export const discsInitialState: DiscsStateType = {
  [getDiscKey(1, 0)]: 40,
  [getDiscKey(1, 1)]: 42,
  [getDiscKey(1, 2)]: 44,
  [getDiscKey(1, 3)]: 46,
  [getDiscKey(1, 4)]: 49,
  [getDiscKey(1, 5)]: 51,
  [getDiscKey(1, 6)]: 53,
  [getDiscKey(1, 7)]: 55,
  [getDiscKey(1, 8)]: 56,
  [getDiscKey(1, 9)]: 58,
  [getDiscKey(1, 10)]: 60,
  [getDiscKey(1, 11)]: 62,
  [getDiscKey(2, 0)]: 1,
  [getDiscKey(2, 1)]: 3,
  [getDiscKey(2, 2)]: 5,
  [getDiscKey(2, 3)]: 7,
  [getDiscKey(2, 4)]: 8,
  [getDiscKey(2, 5)]: 10,
  [getDiscKey(2, 6)]: 12,
  [getDiscKey(2, 7)]: 14,
  [getDiscKey(2, 8)]: 17,
  [getDiscKey(2, 9)]: 19,
  [getDiscKey(2, 10)]: 21,
  [getDiscKey(2, 11)]: 23
};

export type SetDiscNewCoordinates = {
  type: 'SET_DISC_NEW_COORDINATES';
  payload: {
    discId: string;
    newPosition: number;
  };
};

export type DiscsActionType = SetDiscNewCoordinates;

export const discsReducer = (
  state: DiscsStateType,
  action: DiscsActionType
): DiscsStateType => {
  if (action.type === 'SET_DISC_NEW_COORDINATES') {
    const { discId, newPosition } = action.payload;
    return {
      ...state,
      [discId]: newPosition
    };
  }

  return state;
};
