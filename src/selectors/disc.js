import {createSelector} from 'reselect'
import _findKey from 'lodash/findKey'

function getDiscInfo(state, ownProps) {
  let player = 1
  const currentPlayer = state.turns.currentPlayer

  let playerDiscKey = _findKey(
    state.player1.discs,
    item => item.toString() === ownProps.coords.toString(),
  )

  if (!playerDiscKey) {
    player = 2
    playerDiscKey = _findKey(
      state.player2.discs,
      item => item.toString() === ownProps.coords.toString(),
    )
  }

  if (!playerDiscKey) {
    player = 0
  }

  const playersKings = [
    ...Object.values(state.player1.kings),
    ...Object.values(state.player2.kings),
  ]

  const king = playersKings.includes(playerDiscKey)

  return {
    player,
    playerDiscKey,
    king,
    disableDrag: currentPlayer !== player,
  }
}
export const getPlayerDiscInformation = createSelector(getDiscInfo, data => ({
  ...data,
}))
