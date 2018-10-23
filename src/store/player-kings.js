import {createAction} from 'redux-actions'

const playerTypes = {
  1: {
    CREATE: 'checkers/player-1-kings/CREATE',
  },
  2: {
    CREATE: 'checkers/player-2-kings/CREATE',
  },
}

export const createKing = props =>
  createAction(playerTypes[props.player].CREATE, () => props)

const initialState = []

export default function(player) {
  return function reducer(state = initialState, action) {
    const isInitializationCall = state === undefined
    if (action.player !== player && !isInitializationCall) {
      return state
    }

    switch (action.type) {
      case playerTypes[player].CREATE: {
        return state.concat(action.payload.disc)
      }
      default:
        return state
    }
  }
}
