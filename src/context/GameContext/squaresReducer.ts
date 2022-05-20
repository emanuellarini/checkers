export type SquaresStateType = Squares;

export const squaresInitialState: SquaresStateType = {
  1: false,
  3: false,
  5: false,
  7: false,
  8: false,
  10: false,
  12: false,
  14: false,
  17: false,
  19: false,
  21: false,
  23: false,
  24: false,
  26: false,
  28: false,
  30: false,
  33: false,
  35: false,
  37: false,
  39: false,
  40: false,
  42: false,
  44: false,
  46: false,
  49: false,
  51: false,
  53: false,
  55: false,
  56: false,
  58: false,
  60: false,
  62: false
};

export type SetIsDroppable = {
  type: 'SET_IS_DROPPABLE';
  payload: number;
};

export type SetUndroppableInAll = {
  type: 'SET_UNDROPPABLE_IN_ALL';
};

export type SquaresActionType = SetIsDroppable | SetUndroppableInAll;

export const squaresReducer = (
  state: SquaresStateType,
  action: SquaresActionType
): SquaresStateType => {
  if (action.type === 'SET_IS_DROPPABLE') {
    return {
      ...state,
      [action.payload]: true
    };
  }

  if (action.type === 'SET_UNDROPPABLE_IN_ALL') {
    return Object.keys(state).reduce((a, key) => {
      a[Number(key)] = false;
      return a;
    }, {} as SquaresStateType);
  }

  return state;
};
