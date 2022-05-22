import { getIsKingDisc } from '../../lib/disc';

export type BoardStateType = Board;

export const boardInitialState: BoardStateType = {
  '0': { isDarkSquare: false, isDroppable: false },
  '1': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '2': { isDarkSquare: false, isDroppable: false },
  '3': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '4': { isDarkSquare: false, isDroppable: false },
  '5': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '6': { isDarkSquare: false, isDroppable: false },
  '7': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '8': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '9': { isDarkSquare: false, isDroppable: false },
  '10': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '11': { isDarkSquare: false, isDroppable: false },
  '12': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '13': { isDarkSquare: false, isDroppable: false },
  '14': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '15': { isDarkSquare: false, isDroppable: false },
  '16': { isDarkSquare: false, isDroppable: false },
  '17': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '18': { isDarkSquare: false, isDroppable: false },
  '19': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '20': { isDarkSquare: false, isDroppable: false },
  '21': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '22': { isDarkSquare: false, isDroppable: false },
  '23': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '24': { isDarkSquare: true, isDroppable: false },
  '25': { isDarkSquare: false, isDroppable: false },
  '26': { isDarkSquare: true, isDroppable: false },
  '27': { isDarkSquare: false, isDroppable: false },
  '28': { isDarkSquare: true, isDroppable: false },
  '29': { isDarkSquare: false, isDroppable: false },
  '30': { isDarkSquare: true, isDroppable: false },
  '31': { isDarkSquare: false, isDroppable: false },
  '32': { isDarkSquare: false, isDroppable: false },
  '33': { isDarkSquare: true, isDroppable: false },
  '34': { isDarkSquare: false, isDroppable: false },
  '35': { isDarkSquare: true, isDroppable: false },
  '36': { isDarkSquare: false, isDroppable: false },
  '37': { isDarkSquare: true, isDroppable: false },
  '38': { isDarkSquare: false, isDroppable: false },
  '39': { isDarkSquare: true, isDroppable: false },
  '40': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '41': { isDarkSquare: false, isDroppable: false },
  '42': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '43': { isDarkSquare: false, isDroppable: false },
  '44': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '45': { isDarkSquare: false, isDroppable: false },
  '46': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '47': { isDarkSquare: false, isDroppable: false },
  '48': { isDarkSquare: false, isDroppable: false },
  '49': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '50': { isDarkSquare: false, isDroppable: false },
  '51': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '52': { isDarkSquare: false, isDroppable: false },
  '53': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '54': { isDarkSquare: false, isDroppable: false },
  '55': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '56': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '57': { isDarkSquare: false, isDroppable: false },
  '58': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '59': { isDarkSquare: false, isDroppable: false },
  '60': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '61': { isDarkSquare: false, isDroppable: false },
  '62': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '63': { isDarkSquare: false, isDroppable: false }
};

export type SetDroppable = {
  type: 'SET_DROPPABLE';
  payload: Position[];
};

export type MoveDisc = {
  type: 'MOVE_DISC';
  payload: {
    currentPosition: Position;
    newPosition: Position;
  };
};

export type RemoveDisc = {
  type: 'REMOVE_DISC';
  payload: Position;
};

export type BoardActionType = SetDroppable | MoveDisc | RemoveDisc;

export const boardReducer = (
  state: BoardStateType,
  action: BoardActionType
): BoardStateType => {
  if (action.type === 'SET_DROPPABLE') {
    return Object.keys(state).reduce((acc, position) => {
      acc[position] = {
        ...state[position],
        isDroppable: action.payload.includes(position) // disable others as well
      };

      return acc;
    }, {} as BoardStateType);
  }

  if (action.type === 'MOVE_DISC') {
    const { currentPosition, newPosition } = action.payload;

    const { disc, ...otherProps } = state[currentPosition];

    if (!disc) return state;

    const isKing = getIsKingDisc(newPosition, disc);

    return {
      ...state,
      [currentPosition]: otherProps,
      [newPosition]: {
        ...state[newPosition],
        disc: {
          ...disc,
          isKing
        }
      }
    };
  }

  if (action.type === 'REMOVE_DISC') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disc, ...otherProps } = state[action.payload];

    return {
      ...state,
      [action.payload]: otherProps
    };
  }

  return state;
};
