import { getIsKingDisc } from '../../lib/disc';

export type BoardStateType = Board;

export const boardInitialState: BoardStateType = {
  '0': { isDarkSquare: false },
  '1': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '2': { isDarkSquare: false },
  '3': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '4': { isDarkSquare: false },
  '5': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '6': { isDarkSquare: false },
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
  '9': { isDarkSquare: false },
  '10': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '11': { isDarkSquare: false },
  '12': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '13': { isDarkSquare: false },
  '14': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '15': { isDarkSquare: false },
  '16': { isDarkSquare: false },
  '17': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '18': { isDarkSquare: false },
  '19': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '20': { isDarkSquare: false },
  '21': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '22': { isDarkSquare: false },
  '23': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 2, isKing: false }
  },
  '24': { isDarkSquare: true, isDroppable: false },
  '25': { isDarkSquare: false },
  '26': { isDarkSquare: true, isDroppable: false },
  '27': { isDarkSquare: false },
  '28': { isDarkSquare: true, isDroppable: false },
  '29': { isDarkSquare: false },
  '30': { isDarkSquare: true, isDroppable: false },
  '31': { isDarkSquare: false },
  '32': { isDarkSquare: false },
  '33': { isDarkSquare: true, isDroppable: false },
  '34': { isDarkSquare: false },
  '35': { isDarkSquare: true, isDroppable: false },
  '36': { isDarkSquare: false },
  '37': { isDarkSquare: true, isDroppable: false },
  '38': { isDarkSquare: false },
  '39': { isDarkSquare: true, isDroppable: false },
  '40': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '41': { isDarkSquare: false },
  '42': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '43': { isDarkSquare: false },
  '44': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '45': { isDarkSquare: false },
  '46': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '47': { isDarkSquare: false },
  '48': { isDarkSquare: false },
  '49': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '50': { isDarkSquare: false },
  '51': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '52': { isDarkSquare: false },
  '53': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '54': { isDarkSquare: false },
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
  '57': { isDarkSquare: false },
  '58': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '59': { isDarkSquare: false },
  '60': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '61': { isDarkSquare: false },
  '62': {
    isDarkSquare: true,
    isDroppable: false,
    disc: { player: 1, isKing: false }
  },
  '63': { isDarkSquare: false }
};

export type SetDroppable = {
  type: 'SET_DROPPABLE';
  payload: Position[];
};

export type SetUndroppableInAll = {
  type: 'SET_UNDROPPABLE_IN_ALL';
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

export type BoardActionType =
  | SetDroppable
  | SetUndroppableInAll
  | MoveDisc
  | RemoveDisc;

export const boardReducer = (
  state: BoardStateType,
  action: BoardActionType
): BoardStateType => {
  if (action.type === 'SET_DROPPABLE') {
    return Object.keys(state).reduce((acc, v) => {
      acc[v] = {
        ...state[v],
        isDroppable: action.payload.includes(v)
      };

      return acc;
    }, {} as BoardStateType);
  }

  if (action.type === 'SET_UNDROPPABLE_IN_ALL') {
    return Object.keys(state).reduce((acc, key) => {
      acc[key] = { ...state[key], isDroppable: false };

      return acc;
    }, {} as Board);
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
