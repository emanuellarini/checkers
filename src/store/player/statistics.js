const playersTypes = {
  1: {
    INC_CAPTURE_DISCS: 'checkers/player-1-statistics/INC_CAPTURE_DISCS',
    INC_CAPTURE_KINGS: 'checkers/player-1-statistics/INC_CAPTURE_KINGS',
    INC_MULTI_CAPTURE_MOVEMENTS:
      'checkers/player-1-statistics/INC_MULTI_CAPTURE_MOVEMENTS',
  },
  2: {
    INC_CAPTURE_DISCS: 'checkers/player-2-statistics/INC_CAPTURE_DISCS',
    INC_CAPTURE_KINGS: 'checkers/player-2-statistics/INC_CAPTURE_KINGS',
    INC_MULTI_CAPTURE_MOVEMENTS:
      'checkers/player-2-statistics/INC_MULTI_CAPTURE_MOVEMENTS',
  },
}

export const incCapturedDiscs = ({player, amount = 0}) => {
  return {
    player,
    type: playersTypes[player].INC_CAPTURE_DISCS,
    payload: {amount},
  }
}

export const incCapturedKingDiscs = ({player, amount = 0}) => {
  return {
    player,
    type: playersTypes[player].INC_CAPTURE_KINGS,
    payload: {amount},
  }
}

export const incMultiCaptureMovements = ({player}) => {
  return {
    player,
    type: playersTypes[player].INC_MULTI_CAPTURE_MOVEMENTS,
  }
}

const initialState = {
  capturedDiscsCount: 0,
  capturedKingDiscsCount: 0,
  multiCaptureMovesCount: 0,
}

export default function(player) {
  return function reducer(state = initialState, action) {
    const isInitializationCall = state === undefined
    if (action.player !== player && !isInitializationCall) {
      return state
    }

    switch (action.type) {
      case playersTypes[action.player].INC_CAPTURE_DISCS: {
        return {
          ...state,
          capturedDiscsCount: state.capturedDiscsCount + action.payload.amount,
        }
      }
      case playersTypes[action.player].INC_CAPTURE_KINGS: {
        return {
          ...state,
          capturedKingDiscsCount:
            state.capturedKingDiscsCount + action.payload.amount,
        }
      }
      case playersTypes[action.player].INC_MULTI_CAPTURE_MOVEMENTS: {
        return {
          ...state,
          multiCaptureMovesCount: state.multiCaptureMovesCount + 1,
        }
      }
      default:
        return state
    }
  }
}

export const updateStatistics = ({
  player,
  capturedDiscsKeys = [],
  didAMultiCaptureMovement = false,
}) => (dispatch, getState) => {
  if (capturedDiscsKeys.length) {
    const opponent = player === 1 ? 2 : 1
    const opponentKings = getState()[`player${opponent}`].kings
    const captured = capturedDiscsKeys.reduce(
      (a, v) => {
        if (opponentKings.includes(v)) {
          a.kings++
        } else {
          a.discs++
        }

        return a
      },
      {kings: 0, discs: 0},
    )

    if (captured.discs > 0)
      dispatch(incCapturedDiscs({player, amount: captured.discs}))
    if (captured.kings > 0)
      dispatch(incCapturedKingDiscs({player, amount: captured.kings}))
  }

  if (didAMultiCaptureMovement) {
    dispatch(incMultiCaptureMovements({player}))
  }
}
