import appReducer from './app'
import {incWins, incLosses} from './player/statistics'
import {createAction} from 'redux-actions'

const PLAY_AGAIN = 'checkers/game/PLAY_AGAIN'
export const playAgain = createAction(PLAY_AGAIN)

export default function reducer(state = {}, action) {
  if (action.type === PLAY_AGAIN) {
    state = undefined
  }

  return appReducer(state, action)
}

export const restartTheGame = () => (dispatch, getState) => {
  const winner = getState().winner.player
  if (!winner) return false
  dispatch(playAgain())
  dispatch(incWins({player: winner}))
  dispatch(incLosses({player: winner === 1 ? 2 : 1}))
}
