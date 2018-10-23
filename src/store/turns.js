import {createAction} from 'redux-actions'

const PASS_TURN = 'checkers/game/PASS_TURN'
export const passTurn = createAction(PASS_TURN)

const initialState = {
  currentPlayer: 1,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PASS_TURN: {
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      }
    }
    default:
      return state
  }
}
