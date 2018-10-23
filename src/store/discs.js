import {createAction} from 'redux-actions'
import _omit from 'lodash/omit'

const UPDATE = 'checkers/game/UPDATE'
export const updatePlayerDiscCoords = createAction(UPDATE)

const REMOVE = 'checkers/game/REMOVE'
export const removePlayerDiscs = createAction(REMOVE)

const initialState = {
  player1: {
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
  player2: {
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE: {
      const {player, disc, coords} = action.payload

      return {
        ...state,
        [`player${player}`]: {
          ...state[`player${player}`],
          [disc]: coords,
        },
      }
    }
    case REMOVE: {
      const {player, discs} = action.payload

      return {
        ...state,
        [`player${player}`]: _omit(state[`player${player}`], discs),
      }
    }
    default:
      return state
  }
}
