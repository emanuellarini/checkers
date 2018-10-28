import {createSelector} from 'reselect'
import _findKey from 'lodash/findKey'

export const getPlayerFromDiscCoordsSelector = createSelector(
  (state, ownProps) => {
    const stringCoords = JSON.stringify(ownProps.coords)

    if (JSON.stringify(state.player1.discs).includes(stringCoords)) {
      return 1
    }

    if (JSON.stringify(state.player2.discs).includes(stringCoords)) {
      return 2
    }

    return 0
  },
  player => player,
)

export const getDiscKeyFromPlayerDiscsSelector = createSelector(
  (state, ownProps) => player => {
    if (!player) return null

    return _findKey(
      state[`player${player}`].discs,
      item => item.toString() === ownProps.coords.toString(),
    )
  },
  key => key,
)

export const determineIfIsAKingDiscSelector = createSelector(
  state => discKey => {
    const playersKings = [...state.player1.kings, ...state.player2.kings]

    return playersKings.includes(discKey)
  },
  isKing => isKing,
)

export const determineIfDragIsDisabledSelector = createSelector(
  state => player => state.turns.currentPlayer !== player,
  dragDisabled => dragDisabled,
)
