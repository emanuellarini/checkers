import _omit from 'lodash/omit'

const playersTypes = {
  1: {
    UPDATE: 'checkers/player-1-discs/UPDATE',
    REMOVE: 'checkers/player-1-discs/REMOVE',
  },
  2: {
    UPDATE: 'checkers/player-2-discs/UPDATE',
    REMOVE: 'checkers/player-2-discs/REMOVE',
  },
}

export const removePlayerDiscs = ({player, ...args}) => {
  return {
    player,
    type: playersTypes[player].REMOVE,
    payload: args,
  }
}

export const updatePlayerDiscs = ({player, ...args}) => {
  return {
    player,
    type: playersTypes[player].UPDATE,
    payload: args,
  }
}

const initialState = {
  1: {
    grey1: [5, 0],
    grey2: [5, 2],
    grey3: [5, 4],
    grey4: [5, 6],
    grey5: [6, 1],
    grey6: [6, 3],
    grey7: [6, 5],
    grey8: [6, 7],
    grey9: [7, 0],
    grey10: [7, 2],
    grey11: [7, 4],
    grey12: [7, 6],
  },
  2: {
    red1: [0, 1],
    red2: [0, 3],
    red3: [0, 5],
    red4: [0, 7],
    red5: [1, 0],
    red6: [1, 2],
    red7: [1, 4],
    red8: [1, 6],
    red9: [2, 1],
    red10: [2, 3],
    red11: [2, 5],
    red12: [2, 7],
  },
}

export default function(player) {
  return function reducer(state = initialState[player], action) {
    const isInitializationCall = state === undefined
    if (action.player !== player && !isInitializationCall) {
      return state
    }

    switch (action.type) {
      case playersTypes[action.player].UPDATE: {
        const {disc, coords} = action.payload

        return {
          ...state,
          [disc]: coords,
        }
      }
      case playersTypes[action.player].REMOVE: {
        return _omit(state, action.payload.discs)
      }
      default:
        return state
    }
  }
}
