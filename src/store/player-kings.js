const playersTypes = {
  1: {
    CREATE: 'checkers/player-1-kings/CREATE',
  },
  2: {
    CREATE: 'checkers/player-2-kings/CREATE',
  },
}

export const createKing = ({player, disc}) => {
  return {
    player,
    type: playersTypes[player].CREATE,
    payload: {disc},
  }
}

const initialState = []

export default function(player) {
  return function reducer(state = initialState, action) {
    const isInitializationCall = state === undefined
    if (action.player !== player && !isInitializationCall) {
      return state
    }

    switch (action.type) {
      case playersTypes[action.player].CREATE: {
        return [...state, action.payload.disc]
      }
      default:
        return state
    }
  }
}
