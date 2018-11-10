import {createAction} from 'redux-actions'
import {
  calculateMovableSquares,
  calculateMultiCaptureCoords,
} from 'rules/disc/movement'
import {getCapturedDiscKey} from 'rules/disc/capture'
import {calculateKingMovableSquares} from 'rules/king-disc/movement'
import {canCreateKings} from 'rules/king-disc/create'
import {getKingCapturedDiscsKeys} from 'rules/king-disc/capture'
import lookForAWinner from 'rules/winner'
import {passTurn} from './turns'
import {setWinnerPlayer} from './winner'
import {updatePlayerDiscs, removePlayerDiscs} from './player/discs'
import {createKings} from './player/kings'
import {updateStatistics} from './player/statistics'

const SET_MOVABLE = 'checkers/movement/SET_MOVABLE'
const MAKE_MOVEMENT = 'checkers/movement/MAKE_MOVEMENT'
const RESET = 'checkers/movement/RESET'
export const setMovable = createAction(SET_MOVABLE)
export const makeMovement = createAction(MAKE_MOVEMENT)
export const resetMovement = createAction(RESET)

const initialState = {
  movableSquares: [],
  disc: null,
  movementCount: 0,
  captured: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVABLE: {
      return {
        ...state,
        movableSquares: action.payload.movableSquares,
      }
    }
    case MAKE_MOVEMENT: {
      return {
        ...state,
        disc: action.payload.disc,
        movementCount: state.movementCount + 1,
        captured: action.payload.captured,
      }
    }
    case RESET: {
      return {
        ...state,
        ...initialState,
      }
    }
    default:
      return state
  }
}

export const startMovement = (player, disc, king = false) => (
  dispatch,
  getState,
) => {
  const discs = [getState().player1.discs, getState().player2.discs]

  // already moved this turn
  if (getState().movement.movementCount > 0) {
    // selected disc is the previous movement disc and already captured this turn (multicapture!)
    if (disc === getState().movement.disc && getState().movement.captured) {
      return dispatch(
        setMovable({
          movableSquares: calculateMultiCaptureCoords(player, disc, discs),
        }),
      )
    }

    // not a multicapture, we disable his movement
    return dispatch(setMovable({movableSquares: initialState.movableSquares}))
  }

  if (king) {
    return dispatch(
      setMovable({
        movableSquares: calculateKingMovableSquares(player, disc, discs),
      }),
    )
  }

  return dispatch(
    setMovable({movableSquares: calculateMovableSquares(player, disc, discs)}),
  )
}

export const endMovement = (player, destinationCoords, disc, king = false) => (
  dispatch,
  getState,
) => {
  const player1Discs = getState().player1.discs
  const player2Discs = getState().player2.discs
  const discs = [player1Discs, player2Discs]

  const capturedDiscs = king
    ? getKingCapturedDiscsKeys(destinationCoords, player, disc, discs)
    : [getCapturedDiscKey(destinationCoords, player, disc, discs)].filter(
        item => Boolean(item),
      )

  dispatch(updatePlayerDiscs({player, disc, coords: destinationCoords}))

  if (capturedDiscs.length) {
    dispatch(
      removePlayerDiscs({player: player === 1 ? 2 : 1, discs: capturedDiscs}),
    )
  }

  dispatch(updateStatistics({player, capturedDiscsKeys: capturedDiscs}))

  dispatch(makeMovement({disc, captured: capturedDiscs.length}))
}

export const endTurn = ({player}) => (dispatch, getState) => {
  const movementCount = getState().movement.movementCount
  if (movementCount === 0) return false

  const kings = canCreateKings(player, getState()[`player${player}`].discs)

  if (kings.length) {
    dispatch(createKings({player, discs: kings}))
  }

  const winner = lookForAWinner(getState().player1, getState().player2)

  dispatch(
    updateStatistics({player, didAMultiCaptureMovement: movementCount > 1}),
  )

  dispatch(resetMovement())

  if (winner) {
    dispatch(setWinnerPlayer({player: winner}))
  } else {
    dispatch(passTurn())
  }
}
