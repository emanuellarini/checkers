export type DiscsStateType = Game['discs'];

const discsInitialState: DiscsStateType = [];

type MoveDisc = {
  type: 'MOVE_DISC';
  payload: {
    currentPosition: Position;
    newPosition: Position;
    isKing: boolean;
  };
};

type RemoveDisc = {
  type: 'REMOVE_DISC';
  payload: Position;
};

type Reset = {
  type: 'RESET';
};

export type DiscsActionType = MoveDisc | Reset | RemoveDisc;

export const discsReducer = (
  state: DiscsStateType,
  action: DiscsActionType
): DiscsStateType => {
  if (action.type === 'MOVE_DISC') {
    const key = state.findIndex(
      disc => disc.position === action.payload.currentPosition
    );

    if (!key) return state;

    const newState = [...state];
    newState[key] = {
      ...state[key],
      isKing: action.payload.isKing,
      position: action.payload.newPosition
    };
    return newState;
  }

  if (action.type === 'REMOVE_DISC') {
    return state.filter(disc => disc.position !== action.payload);
  }

  if (action.type === 'RESET') {
    return discsInitialState;
  }

  return state;
};
