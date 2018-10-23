import {createAction} from 'redux-actions'
import {calculateMovableSquares} from 'rules/disc/movement'
import {getCapturedDiscKey} from 'rules/disc/capture'
import {calculateKingMovableSquares} from 'rules/king-disc/movement'
import {canCreateKing} from 'rules/king-disc/create'
import {getKingCapturedDiscsKeys} from 'rules/king-disc/capture'
import {passTurn} from './turns'
import {updatePlayerDiscCoords, removePlayerDiscs} from './discs'

const UPDATE = 'checkers/movement/UPDATE'
export const update = createAction(UPDATE)

const initialState = {
  currentPlayerMovableSquares: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE: {
      return {
        ...state,
        currentPlayerMovableSquares: action.payload,
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
  const discs = [getState().discs.player1, getState().discs.player2]

  const movableSquares = king
    ? calculateKingMovableSquares(player, disc, discs)
    : calculateMovableSquares(player, disc, discs)

  dispatch(update(movableSquares))
}

export const endMovement = (player, destinationCoords, disc, king = false) => (
  dispatch,
  getState,
) => {
  const player1Discs = getState().discs.player1
  const player2Discs = getState().discs.player2
  const discs = [player1Discs, player2Discs]

  const capturedDiscs = king
    ? getKingCapturedDiscsKeys(destinationCoords, player, disc, discs)
    : [getCapturedDiscKey(destinationCoords, player, disc, discs)]

  const createKing = canCreateKing(destinationCoords, player)

  if (createKing) {
    dispatch(createKing({disc, player}))
  }

  if (capturedDiscs.length) {
    dispatch(
      removePlayerDiscs({player: player === 1 ? 2 : 1, discs: capturedDiscs}),
    )
  }

  dispatch(updatePlayerDiscCoords({player, disc, coords: destinationCoords}))
  dispatch(passTurn())
}
