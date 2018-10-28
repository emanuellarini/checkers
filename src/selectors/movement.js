import {createSelector} from 'reselect'

function isDisabled(state, ownProps) {
  const stringMovableSquares = JSON.stringify(
    state.movement.currentPlayerMovableSquares,
  )

  return !stringMovableSquares.includes(JSON.stringify(ownProps.coords))
}

export const determineDisabledStatus = createSelector(
  isDisabled,
  disabled => disabled,
)
